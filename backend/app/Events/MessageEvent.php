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

    private  $senderId ,$message ,$receiverId;
    /**
     * Create a new event instance.
     */
    public function __construct($receiverId,$senderId, $message)
    {
        $this->receiverId =$receiverId;
        $this->senderId = $senderId;
        $this->message = $message;
    }


    public function broadcastWith(){
        
        return [
            'id'=>Str::orderedUuid(),
            'senderId'=>$this->senderId,
            'receiveuser'=>$this->receiverId,
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
    public function broadcastOn():Array
    {
        
        return [new PrivateChannel('private-chat.'.$this->receiverId. '.' .$this->senderId),
                new PrivateChannel('private-chat.'.$this->senderId. '.' .$this->receiverId)];
        
    }
}
