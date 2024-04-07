<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class GetmemberemailController extends Controller
{
    public function __invoke()
    {
        if(Auth::check()){
            $userid = Auth::id();

            $email = DB::table('members')->where('mid',$userid)->value('email');
            return response()->json(['email'=>$email]);
        }else{
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        
        
    }
}
