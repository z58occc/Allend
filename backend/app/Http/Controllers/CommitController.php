<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
// Removed unused import statement

class CommitController extends Controller
{
    public function __invoke(Request $request)
    {

        $Case_name = $request->Case_name;
        $Case_type = $request->Case_type;
        $LenghDate =$request->LenghDate;
        $Money = $request->Money;
        $People = $request->People;
        $Place = $request ->Place;
        $commit_content = $request->commit_content;
        $commit_email = $request->commit_email;
        $commit_phone = $request->phone;
        $commit_date = $request->commit_date;
        $commit_unit = $request->unit;

        //         $this->validate($request,[
        //     'Case_type'=>['required', 'unique:Case_type', 'max:255'],
        //     'Case_name' => ['required','unique:Case_name'],
        //     'Money' => ['required','unique:Money'],
        //     'commit_date' =>[ 'required','unique:commit_date'],
        //     'commit_content' => ['required','unique:commit_content']
        // ]); 


        // $commit = DB::table('')->insert([
        //     'Case_type'=>$request['Case_type'],'Case_name'=>$request,
        //     'Money'=>$request['Money'],'commit_date'=>$request['commit_date'],
        //     'commit_content'=>$request['commit_content']
        // ]);

        return response($Case_name);
    }
}