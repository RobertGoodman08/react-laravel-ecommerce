<?php

namespace App\Listeners;

use App\Events\OrderCompletedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Message;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class NotifyAdminLister
{


    public function handle(OrderCompletedEvent $event)
    {
        $order = $event->order;
        Mail::send('influencer.admin', ['order' => $order], function (Message $message) use ($order){
            $message->to('admin@admin.com');
            $message->subject('A new order has been completed');
        });
    }
}
