<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{

    public function __invoke(Request $request)
    {
        $user = Auth::id();
        event(new MessageEvent($user, $request->message));
        return 'ok';
    }
}
