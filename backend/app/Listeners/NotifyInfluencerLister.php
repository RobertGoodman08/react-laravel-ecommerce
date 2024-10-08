<?php

namespace App\Listeners;

use App\Events\OrderCompletedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Message;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class NotifyInfluencerLister
{

    public function handle(OrderCompletedEvent $event)
    {
        $order = $event->order;
        Mail::send('influencer.influencer', ['order' => $order], function (Message $message) use ($order){
            $message->to($order->influencer_email);
            $message->subject('A new order has been completed');
        });
    }
}
