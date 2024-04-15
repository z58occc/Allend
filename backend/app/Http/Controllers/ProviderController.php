<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class ProviderController extends Controller
{
    public function redirect(){
        return Socialite::driver('google')
        //->setScopes(['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'])
        ->stateless()->redirect()->getTargetUrl();
        // dd(Socialite::driver('google')->redirect());
    }

    public function callback(){
        try{
            $SocialUser = Socialite::driver('google')->stateless()->user();

            $user = Member::where('email', $SocialUser->getEmail())
            ->where('provider', 'google')->orWhere('provider', null)->first();

            if ($user->exists())
            {
                $token = JWTAuth::fromUser($user);
            }else{
                $user = Member::create([
                    'provider' => 'google',
                    'email' => $SocialUser->email,
                    'password' => "",
                    'name' => $SocialUser->name,
                    'avatar' => $SocialUser->avatar,
                    'email_verified_at' => now(),
                    'last_login' => now(),
                ]);
                $token = JWTAuth::fromUser($user);
            }

            return response()->json([
                'token' => $token,
            ]);

            // $token = auth()->setTTL(120)->attempt([$SocialUser]);
            // dd($token);

            // $user = Member::where([
            //     'provider' => $provider,
            //     'provider_id' => $SocialUser->getId(),
            // ])->first();
            // if(!$user){
            //     $user = Member::create([
            //         'name' => $SocialUser->getName(),
            //         'email' => $SocialUser->getEmail(),
            //         'username' => Member::generateUserName($SocialUser->getNickname()), // google沒有nickname
            //         'provider' => $provider,
            //         'provider_id' => $SocialUser->getId(),
            //         'provider_token' => $SocialUser->token,
            //         'email_verified_at' => now(),
            //         // 'provider_refresh_token' => $SocialUser->refreshToken,
            //     ]);
            // }
            // Auth::login($user);

            // return redirect('/dashboard');
        }catch(Exception $error){
            return $error;
        }
    }
}
