<?php

namespace App\Providers;

use App\Events\AdminAddedEvent;
use App\Events\OrderCompletedEvent;
use App\Events\ProductUpdatedEvent;
use App\Listeners\NotifyAddedAdminListener;
use App\Listeners\NotifyAdminLister;
use App\Listeners\NotifyInfluencerLister;
use App\Listeners\ProductCacheFlush;
use App\Listeners\UpdateRangkingsListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        OrderCompletedEvent::class => [
            NotifyAdminLister::class,
            NotifyInfluencerLister::class,
            UpdateRangkingsListener::class,
        ],
        AdminAddedEvent::class => [
            NotifyAddedAdminListener::class,
        ],
        ProductUpdatedEvent::class => [
            ProductCacheFlush::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}
