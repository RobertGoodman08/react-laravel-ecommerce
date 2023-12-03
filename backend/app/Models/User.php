<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['first_name', 'last_name', 'email', 'password', 'role_id'];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function role() {
        return $this->hasOneThrough(Role::class, UserRole::class, 'user_id', 'id', 'id', 'role_id');
    }

//    public function permissions() {
//        return $this->role->permissions->pluck('name');
//    }

    public function hasAccess($access) {
        return $this->permissions()->contains($access);
    }


    public function isAdmin(): bool
    {
        return $this->is_influencer == 0;
    }

    public function isInfluencer(): bool
    {
        return $this->is_influencer == 1;
    }

    public function tokenCan($scope)
    {
        return $this->tokens->contains(function ($token) use ($scope) {
            return $token->can($scope);
        });
    }


    public function getRevenueAttribute() {
        $orders = Order::where('user_id', $this->id)->where('complete', 1)->get();

        return $orders->sum(function (Order $order) {
           return $order->influecer_total;
        });
    }

    public function getFullNameAttribute() {
        return $this->first_name . ' ' . $this->last_name;
    }


}
