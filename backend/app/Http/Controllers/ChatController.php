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
        $asSender = DB::table('chat')
                    ->join('members', 'mid', '=', 'receiver_id')
                    ->select('receiver_id as id', 'name')
                    ->where('sender_id', $senderId)
                    ->groupBy('receiver_id', 'name');

        $asReceiver = DB::table('chat')
                    ->join('members', 'mid', '=', 'sender_id')
                    ->select('sender_id as id', 'name')
                    ->where('receiver_id', $senderId)
                    ->groupBy('sender_id', 'name');

        $union = $asSender->union($asReceiver)->get();

        return response()->json($union);
    }

    public function Getmessage(Request $request)
    {
        $senderId = Auth::id();
        $receiverId = $request->receiverId;
        $messages = DB::table('chat')
            ->select('sender_id', 'receiver_id', 'content', 'sending_time')
            ->whereIn('sender_id', [$senderId,$receiverId])
            ->WhereIn('receiver_id',[$senderId,$receiverId])
            ->orderBy('sending_time', 'desc')
            ->get();

        return response()->json($messages);
    }
}
