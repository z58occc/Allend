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

    public function Getlist(Request $request)
    {
        $senderId = Auth::id();
        // $receiverId = $request->receiverId;
        $messages = DB::table('chat')
            ->join('members', 'members.mid', '=', 'chat.receiver_id')
            ->select('sender_id', 'receiver_id', DB::raw('GROUP_CONCAT(content ORDER BY sending_time SEPARATOR "\n") AS content_list'), 'members.name')
            ->groupBy('sender_id', 'receiver_id', 'members.name')
            ->orWhere('sender_id', $senderId)
            ->get();


        return response()->json($messages);
    }

    public function Getmessage(Request $request)
    {
        $senderId = Auth::id();
        // $receiverId = $request->receiverId;
        $messages = DB::table('chat')
            ->select('sender_id', 'receiver_id', 'content', 'sending_time')
            ->orWhere('sender_id', $senderId)
            ->orWhere('receiver_id',$senderId)
            ->get();


        return response()->json($messages);
    }
}
