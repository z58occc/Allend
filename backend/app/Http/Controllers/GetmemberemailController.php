<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class GetmemberemailController extends Controller
{
    public function __invoke(Request $request)
    {
        if (Auth::check()) {
            $userid = Auth::id();
            $email = DB::table('members')->where('mid', $userid)->value('email');
            $members = DB::table('members')->where('mid', $userid)->value('mid');
            $name = DB::table('members')->where('mid', $userid)->value('name');
            $fromGoogle = DB::table('members')->where('mid', $userid)->value('provider');
            $emailVerified = DB::table('members')->where('mid', $userid)->value('email_verified_at');

            $response = [
                'email' => $email,
                'mid' => $members,
                'name' => $name,
                'provider' => $fromGoogle !== null ? 1 : 0,
                'verified' => $emailVerified !== null ? 1 : 0,
            ];

            if ($request->has('receiverId')) {
                $receiverId = $request->receiverId;
                $receiver = DB::table('members')->where('mid', $receiverId)->first();

                if ($receiver) {
                    $response['receivername'] = $receiver->name;
                    $response['receiveremail'] = $receiver->email;
                }
            }
            return response()->json($response);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
