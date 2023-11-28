<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Resources\UserRerource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController
{


    public function login(Request $request) {
        $credentials = $request->only('email', 'password');

        if(Auth::attempt($credentials)) {
            $user = Auth::user();
            $scope = $request->input('scope');

            if($user->isInfluencer() && $scope != 'influencer') {
                return response([
                   'error' => 'Access denied!',
                ], Response::HTTP_FORBIDDEN);
            }

            //  $token = $user->createToken('admin')->accessToken;
            $token = $user->createToken($scope, [$scope])->plainTextToken;

            $cookie = \cookie('jwt', $token, 3600);

            return \response([
                'token' => $token,
            ])->withCookie($cookie);
        }

        return response([
            'error' => 'Invalid Credentials',
        ], \Symfony\Component\HttpFoundation\Response::HTTP_UNAUTHORIZED);
    }



    public function logout() {
        $cookie = Cookie::forget('jwt');

        return \response([
            'message' => 'success'
        ])->withCookie($cookie);
    }


    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
//            'role_id' => 1,
            'is_influencer' => 1,
        ]);

        return response($user, Response::HTTP_CREATED);
    }


    public function user()
    {
        try {
            $userId = Auth::id(); // Получаем ID текущего пользователя

            $user = User::find($userId); // Ищем пользователя по полученному ID

            $resource = new UserRerource($user);

            if($user->isInfluencer()) {
                return $resource;
            }

            if ($user) {
                // Если пользователь найден, возвращаем данные в нужном формате
                return $resource->additional([
                    'data' => [
                        'permissions' => $user->permissions, // Получаем разрешения пользователя
                    ]
                ]);
            } else {
                // Если пользователя нет, возвращаем ошибку 404
                return response()->json(['error' => 'Пользователь не найден'], 404);
            }
        } catch (\Exception $e) {
            // В случае возникновения ошибки, возвращаем сообщение об ошибке 500
            return response()->json(['error' => 'Ошибка при получении данных пользователя: ' . $e->getMessage()], 500);
        }
    }





    public function updateInfo(UpdateInfoRequest $request) {
        $user = Auth::user();

        $user->update($request->only('first_name', 'last_name', 'email'));

        return response(new UserRerource($user), Response::HTTP_ACCEPTED);
    }

    public function updatePassword(UpdatePasswordRequest $request) {
        $user = Auth::user();

        $user->update([
            'password' => Hash::make($request->input('password'))
        ]);

        return response(new UserRerource($user), Response::HTTP_ACCEPTED);
    }

}
