<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('code');
            $table->unsignedBigInteger('user_id');
            $table->string('influencer_email');
            $table->string('address');
            $table->string('address2');
            $table->string('city');
            $table->string('country');
            $table->string('zip');
            $table->tinyInteger('complete')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('code');
            $table->dropColumn('user_id');
            $table->dropColumn('influencer_email');
            $table->dropColumn('address');
            $table->dropColumn('address2');
            $table->dropColumn('city');
            $table->dropColumn('country');
            $table->dropColumn('zip');
            $table->dropColumn('complete');
        });
    }
};
