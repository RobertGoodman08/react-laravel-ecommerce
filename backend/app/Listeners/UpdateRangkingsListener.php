<?php

namespace App\Listeners;

use App\Events\OrderCompletedEvent;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UpdateRangkingsListener
{

    public function handle(OrderCompletedEvent $event)
    {
        $order = $event->order;

        $revenue = $order->getInfluencerTotalAttribute();

        $user = User::find($order->user_id);

    }
}
