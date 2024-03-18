<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WorkController extends Controller
{
    public function __invoke(Request $request)
    {
        $work_name = $request->work_name;
        $work_context = $request->work_context;
    }
}
