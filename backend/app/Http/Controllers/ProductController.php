<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{


    public function index() {

        $products = Product::paginate();

        return ProductResource::collection($products);
    }




    public function show($id) {
        return New ProductResource(Product::find($id));
    }


    public function store(Request $request) {
        if ($request->hasFile('image')) {
            $name = Str::random(10);
            $file = $request->file('image');
            $url = '/public/images/' . $name . '.' . $file->extension();

            $file->move(public_path('/images'), $name . '.' . $file->extension());


            // Создание продукта в транзакции
            DB::beginTransaction();
            try {
                $product = Product::create([
                    'title' => $request->input('title'),
                    'description' => $request->input('description'),
                    'image' => $url,
                    'price' => $request->input('price'),
                ]);

                DB::commit();

                return response()->json($product, 201); // 201 Created
            } catch (\Exception $e) {
                DB::rollBack();

                // Если произошла ошибка, вернуть ошибку
                return response()->json(['error' => 'Failed to create product.'], 500); // 500 Internal Server Error
            }
        } else {
            return response()->json(['error' => 'No file uploaded.'], 400); // 400 Bad Request
        }
    }


//$product = Product::find($id);
//
//$product->update($request->only('title', 'description', 'image', 'price'));
//
//return response($product, Response::HTTP_ACCEPTED);


    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 404);
        }

        // Сохраняем текущий URL изображения
        $imageUrl = $product->image;

        // Обновляем только указанные поля продукта
        $product->fill($request->only('title', 'description', 'price'));

        // Если пришло новое изображение, обрабатываем его
        if ($request->hasFile('image')) {
            $uploadedFile = $request->file('image');

            // Генерация уникального имени для файла
            $name = time() . '_' . $uploadedFile->getClientOriginalName();
            $imageUrl = 'images/' . $name; // Путь к изображению в public/images

            // Сохранение изображения с уникальным именем
            $uploadedFile->move(public_path('images'), $name);
        }

        // Сохраняем URL изображения в базе данных
        $product->image = $imageUrl;
        $product->save();

        return response($product, Response::HTTP_ACCEPTED);
    }






    public function upload_image(Request $request) {
        if ($request->hasFile('image')) {
            $name = Str::random(10);
            $file = $request->file('image');
            $url = '/public/images/' . $name . '.' . $file->extension(); // изменение пути

            // Сохранение файла в хранилище
            $file->move(public_path('/images'), $name . '.' . $file->extension()); // сохранение в public/images

            return response()->json(['url' => $url], 200);
        } else {
            return response()->json(['error' => 'No file uploaded.'], 400);
        }
    }




    public function destroy($id) {
        Product::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }


}
