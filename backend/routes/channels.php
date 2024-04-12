<?php

use Illuminate\Mail\Events\MessageSent;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('private-chat.{receiverId}.{senderId}', function ($user, $receiverId, $senderId) {
    
    $members = DB::table('members')->where('mid', $senderId)->first();

    return  Auth::user()->mid === $members->mid;
});
