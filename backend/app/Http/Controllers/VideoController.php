<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function __invoke(Request $request)
    {
        $video_name = $request->video_name;
        $video_context = $request->video_context;
        $video_src = $request->video_src;
    }
}
