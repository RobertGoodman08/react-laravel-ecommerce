<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UserCreateRequest;
use App\Http\Resources\UserRerource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
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


    public function user() {
        $user = Auth::user();

        return (new UserRerource($user))->additional([
            'data' => [
                'permissions' => $user->permissions()
            ]
        ]);
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
