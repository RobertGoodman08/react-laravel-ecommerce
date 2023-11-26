<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Exception;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UserCreateRequest;
use App\Http\Resources\UserRerource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class UserController
{



    public function index() {

        $user = User::paginate();

        return UserRerource::collection($user);
    }


    public function show($id) {
        $user = User::find($id);

        return new UserRerource($user);
    }


    public function store(UserCreateRequest $request)
    {
        try {
            $data = $request->validated();

            $data['password'] = Hash::make($data['password']);

            $user = User::create($data);

            return response([
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
            ], Response::HTTP_CREATED);
        } catch (Exception $e) {
            return response(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }



    public function update(Request $request, $id) {
        $user = User::find($id);

        $user->update($request->only('first_name', 'last_name', 'email', 'role_id'));

        return response(new UserRerource($user), Response::HTTP_ACCEPTED);
    }

    public function destroy($id) {
        User::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }


    public function user()
    {
        try {
            $userId = Auth::id(); // Получаем ID текущего пользователя

            $user = User::find($userId); // Ищем пользователя по полученному ID

            if ($user) {
                // Если пользователь найден, возвращаем данные в нужном формате
                return (new UserRerource($user))->additional([
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
