<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class ProviderController extends Controller
{
    public function redirect(){
        return Socialite::driver('google')
        //->setScopes(['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'])
        ->stateless()->redirect()->getTargetUrl();
    }

    public function callback(Request $request){
        try{
            $requestData = $request->only('authuser', 'code', 'prompt', 'scope');

            $SocialUser = Socialite::driver('google')
            ->stateless()->with($requestData)->user();

            $user = DB::table('members')
            ->where('email', $SocialUser->getEmail())->where('provider', 'google')->first();

            if ($user){
                DB::table('members')->where('mid', $user->mid)->update(['last_login' => now()]);
            }else{
                $user = DB::table('members')->insert([
                    'provider' => 'google',
                    'email' => $SocialUser->email,
                    'password' => Hash::make('google'),
                    'name' => $SocialUser->name,
                    'avatar' => $SocialUser->avatar,
                    'email_verified_at' => now(),
                    'created_at' => now(),
                    'updated_at' => now(),
                    'last_login' => now(),
                ]);
            }

            if (!$token = auth()->setTTL(120)->attempt([
                'email' => $SocialUser->email,
                'password' => 'google',
                'provider' => 'google'
            ])) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            return response()->json([
                'token' => $token,
            ]);
        }catch(Exception $error){
            return $error;
        }
    }
}
