<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AcceptanceIssueController extends Controller
{
    public function getData(Request $request)
    {
        $data = DB::table('demmand')
        ->join('country','d_active_location','=','country_id')
        ->select('did','d_name','d_type','d_amount','country_city','d_duration','d_description')
        ->where('did',$request->input('did'));

        return response()->json($data->get());
    }

    public function saveData(Request $request){
        $did = $request->input('did');
        DB::table('demmand')->where('did',$did)->update([
            'd_name' => $request->input('d_name'),
            'd_type' => $request->input('d_type'),
            'd_amount' => $request->input('d_amount'),
            'd_active_location' => $request->input('d_active_location'),
            'd_duration' => $request->input('d_duration'),
            'd_description' => $request->input('d_description')
        ]);
        
        return response()->json(['message'=>'Update Success']);
    }
}
