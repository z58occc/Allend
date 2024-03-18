<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RegisterController extends Controller
{
    public function create(Request $request){
        $name = $request->name;
        $email = $request->email;
        $password = $request->password;

        return DB::table('users')->insert([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ]);
    }
}
