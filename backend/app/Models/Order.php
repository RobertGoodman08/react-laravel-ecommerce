<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public function orderItems() {
        return $this->hasMany(OrderItem::class);
    }

    public function getAdminTotalAttribute() {
        return $this->orderItems->sum(function (OrderItem $item){
            return $item->admin_revenue;
        });
    }

    public function getInfluencerTotalAttribute() {
        usleep(3000);
        return $this->orderItems->sum(function (OrderItem $item){
            return $item->influencer_revenue;
        });
    }

    public function getNameAttribute() {
        return $this->first_name . ' ' . $this->last_name;
    }
}
