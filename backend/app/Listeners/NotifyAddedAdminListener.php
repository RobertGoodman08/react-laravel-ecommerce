<?php

namespace App\Listeners;

use App\Events\AdminAddedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Message;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class NotifyAddedAdminListener
{

    public function __construct(AdminAddedEvent $event)
    {
        $user = $event->user;
        Mail::send('admin.adminAdded', [], function (Message $message) use ($user){
            $message->to($user->email);
            $message->subject('You have been added to the Admin App!');
        });
    }


}
