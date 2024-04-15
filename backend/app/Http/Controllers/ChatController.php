<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{

    public function Newmessage(Request $request)
    {
        $senderId = Auth::id();
        $receiverId = $request->receiverId;
        event(new MessageEvent($receiverId, $senderId, $request->message));


        $this->validate($request, [
            'message' => ['required'],
        ]);
        $mes = DB::table('chat')->insert([
            'sender_id' => $senderId,
            'receiver_id' => $receiverId,
            'content' => $request['message'],
            'sending_time' => now()->toDateTimeString(),
        ]);

        return response()->json($mes);
    }

    public function Getmessage(Request $request)
    {
        $senderId = Auth::id();
        $receiverId = $request->receiverId;
        $messages = DB::table('chat')
            ->where('sender_id', $senderId)
            ->where('receiver_id', $receiverId)
            ->orWhere('sender_id', $receiverId)
            ->where('receiver_id', $senderId)
            ->get();
        return response()->json($messages);
    }
}
