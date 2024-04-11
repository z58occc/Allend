<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class MessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private  $user ,$message;
    /**
     * Create a new event instance.
     */
    public function __construct($user, $message)
    {
        $this->user = $user;
        $this->message = $message;
    }


    public function broadcastWith(){
        
        return [
            'id'=>Str::orderedUuid(),
            'user'=>$this->user,
            'message'=>$this->message,
            'created_at'=>now()->toDateTimeString(),
        ];
    }

    public function broadcastAs(){
        return 'message.new';
    }
    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn():Channel
    {
        $user = Auth::id();
        return new PrivateChannel('user.'.$user);
        
    }
}
