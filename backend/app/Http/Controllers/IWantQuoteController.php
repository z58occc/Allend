<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class IWantQuoteController extends Controller
{
    public function __invoke(Request $request)
    {


        $this->validate($request,[
            'q_amount'=>['require'],
        ]);

}
}