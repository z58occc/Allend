<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IFindCommitController extends Controller
{
    public function __invoke(Request $request)
    {
        $id = $request->id;
        $demands = DB::table('demmand')->where('d_type',$id)->get();
        return response()->json($demands);
    }
}
