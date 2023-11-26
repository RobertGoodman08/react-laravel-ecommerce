<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageController
{

    public function upload(Request $request) {
        $name = Str::random(10);
        $file = $request->file('image');
        $url = Storage::putFileAs('images', $file, $name . '.' . $file->extension());
    }
}
