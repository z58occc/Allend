<?php

namespace App\Http\Controllers;

// use App\Models\User;
use App\Models\Member;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use PHPOpenSourceSaver\JWTAuth\Contracts\Providers\JWT;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Throwable;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register',]]);
    }

    // 註冊api
    public function register(Request $request){
        // 先進行驗證跟錯誤處理
        try{
            $request->validate([
                'name' => 'required|string',
                'email' => 'required|string|email|unique:members',
                'password' => 'required|string|min:6',
            ]);
        }
        catch (ValidationException $exception){
            return response('輸入資料格式有誤或是電子郵件已被註冊!');
        }
        // 插入資料庫，若重複會回傳錯誤訊息
        try{
            Member::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        //     User::create([
        //     'name' => $request->name,
        //     'email' => $request->email,
        //     'password' => Hash::make($request->password),
        // ]);
            return response()->json([
                'message' => '註冊成功!',
            ]);
        }
        catch(Throwable $err){
            // return response('email已被註冊過!');
            return response($err);
        }
    }

    // 登入api
    public function login(Request $request){
        try{
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);
        }
        catch (ValidationException $exception){
            return response('輸入資料格式錯誤');
        }
        $credentials = $request->only('email', 'password');
        // $token = auth()->attempt($credentials);
        $token = auth()
            ->setTTL(120) // 設置過期時間，單位(整數)分鐘
            ->attempt($credentials);

        if(!$token){
            return response()->json([
                'message' => '帳號或密碼錯誤'
            ]);
        }

        $user = Auth::user();
        return response()->json([
            'user_tag' => $user,
            'user_logintime' => date('Y-m-d H:i:s'),
            'token' => $token,
        ]);
    }

    // 修改資料
    public function update(Request $request){
        try{
            $payload = JWTAuth::parseToken()->getPayload(); // 直接抓有沒有Bearer token，只能取得payload
        }catch(Throwable $err){
            return response('無效的請求');
        }
        $user_id = auth()->user()->id;
        // try{
        //     Member::where('id', $user_id)->update([
        //         // 'avatar' => $request->,
        //         // 'identity' => $request->identity ? "A" : "B",
        //         // 'nickname' => $request->,
        //         // 'seniority' => $request->,
        //         // 'active_location' => $request->,
        //         // 'mobile_phone' => $request->,
        //         // 'name' => $request->,
        //         // 'id_card' => $request->,
        //         // 'gender' => $request->,
        //         // 'location' => $request->,
        //         'updated_at' => date('Y-m-d H:i:s'),
        //     ]);
        // }catch(Throwable $err){
        //     return response('修改失敗');
        // }

        // identity: "",
        // experience: "",
        // location: "",
        // idCard: "",
        // email: "",
        // name: "",
        // phone: "",
        // gender: "",
        // area: "",
        // selectedDate: new Date(),

        return response()->json($request);
    }

    // public function update(ProfileUpdateRequest $request): RedirectResponse
    // {
    //     // 會跑去檢查rules，回傳json字串，fill()參考User內的$fillable對應值傳入資料庫
    //     $validated = $request->validated();
    //     if (isset($request->image)){
    //         $data = $request->image->get();
    //         $mime_type = $request->image->getMimeType(); // 回傳格式字串
    //         $imageData = base64_encode($data);
    //         $src = "data: $mime_type;base64, $imageData";// img tag 所需的標籤格式
    //         $validated['image'] = $src; // 補上image資料，跳過驗證
    //     }
    //     $request->user()->fill($validated);

    //     if ($request->user()->isDirty('email')) {
    //         $request->user()->email_verified_at = null;
    //     }

    //     $request->user()->save();

    //     return Redirect::route('profile.edit')->with('status', 'profile-updated');
    // }
    // 登出
    public function logout(Request $request){
        Auth::guard('api')->logout();

        return redirect('/login');
    }

    // 獲取會員資料
    public function acquire(Request $request){
        // try{
        //     $payload = JWTAuth::parseToken()->getPayload(); // 直接抓有沒有Bearer token，只能取得payload
        // }catch(Throwable $err){
        //     return response('無效的請求');
        // }
        $user = Auth::user();
        return response()->json([
            'user' => $user->id,
        ]);
    }







    //  // 從請求頭獲取 JWT
    //  $jwt = $request->bearerToken();

    //  if (!$jwt) {
    //      // 如果未提供 JWT，直接拒絕請求
    //      return response()->json(['error' => 'Token not provided.'], 401);
    //  }

    //  try {
    //      // 解碼並驗證 JWT
    //      $payload = JWT::decode($jwt, env('JWT_SECRET'), ['HS256']);

    //      // 驗證通過，可以在請求中添加用戶信息
    //      $request->merge(['user' => $payload->user]);
    //  } catch (ExpiredException $e) {
    //      // 處理 JWT 過期
    //      return response()->json(['error' => 'Provided token is expired.'], 400);
    //  } catch (SignatureInvalidException $e) {
    //      // 處理 JWT 簽名無效
    //      return response()->json(['error' => 'Invalid credentials.'], 400);
    //  } catch (Exception $e) {
    //      // 處理其他異常
    //      return response()->json(['error' => 'Could not decode token.'], 400);
    //  }

    //  // 繼續處理請求
    //  return $next($request);
}
