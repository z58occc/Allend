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
            if ($request->has('receiverId')) {
                $receivername = DB::table('members')->where('mid', $request->receiverId)->value('name');
                $receiveremail = DB::table('members')->where('mid', $request->receiverId)->value('email');
            }
            return response()->json([
                'email' => $email,
                'mid' => $members,
                'name' => $name,
                'receivername' => $receivername,
                'receiveremail' => $receiveremail,
            ]);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
