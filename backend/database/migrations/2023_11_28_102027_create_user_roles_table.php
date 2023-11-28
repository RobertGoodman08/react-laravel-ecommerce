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
        if (!Schema::hasTable('user_roles')) {
            Schema::create('user_roles', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('user_id')->unique();
                $table->unsignedBigInteger('role_id');

                $table->foreign('user_id')->references('id')->on('users');
                $table->foreign('role_id')->references('id')->on('roles');
            });

            // Your insertion logic here
            $users = \App\Models\User::all();

            foreach ($users as $user) {
                $role = \App\Models\Role::find($user->id); // Assuming it's finding role by user_id

                if ($role) { // If the role exists
                    \Illuminate\Support\Facades\DB::table('user_roles')->insert([
                        'user_id' => $user->id,
                        'role_id' => $role->id,
                    ]);
                }
            }
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_roles');
    }
};
