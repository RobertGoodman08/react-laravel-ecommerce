<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Factory::factoryForModel(Order::class)->count(30)->create()
            ->each(function (Order $order){
                Factory::factoryForModel(OrderItem::class, random_int(1, 5))->create([
                   'order_id' => $order->id,
                ]);
            });
    }
}
