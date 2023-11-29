<?php

namespace App\Http\Controllers\Influencer;

use App\Http\Resources\LinkResource;
use App\Models\Link;
use App\Models\LinkProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LinkController
{


    public function store(Request $request)
    {
        $products = $request->input('products');


        if (!is_array($products)) {
            return response()->json(['error' => 'Products should be an array'], 400);
        }

        $link = Link::create([
            'user_id' => $request->user()->id,
            'code' => Str::random(6),
        ]);

        foreach ($products as $product_id) {
            LinkProduct::create([
                'link_id' => $link->id,
                'product_id' => $product_id,
            ]);
        }

        return new LinkResource($link);
    }

}
