<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{

    public function __invoke(Request $request)
    {
        $senderId = Auth::id();
        $receiverId = $request->receiverId;
        event(new MessageEvent($receiverId, $senderId ,$request->message));
        return response()->json(['receiverId' => $receiverId,
                                    'senderId' => $senderId,
                                    'message' => $request->message]);
    }
}
