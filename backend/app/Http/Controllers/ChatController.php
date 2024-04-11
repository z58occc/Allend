<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function __invoke(Request $request)
    {
        event(new MessageEvent($request->user, $request->message));
        return 'ok';
    }
}
