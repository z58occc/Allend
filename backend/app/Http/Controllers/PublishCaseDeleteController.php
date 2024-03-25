<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PublishCaseDeleteController extends Controller
{
    public function __invoke(Request $request)
    {
        $mid = Auth::guard('api')->id();
        if($mid){
            
        }
    }
}
