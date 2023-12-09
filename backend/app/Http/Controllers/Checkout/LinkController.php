<?php

namespace App\Http\Controllers\Checkout;

use App\Http\Resources\LinkResource;
use App\Models\Link;
use Illuminate\Http\Request;

class LinkController
{
    public function show($code) {
        $link = Link::where('code', $code)->first();

        if (!$link) {
            return response()->json(['error' => 'Link not found'], 404);
        }

        return new LinkResource($link);
    }

}
