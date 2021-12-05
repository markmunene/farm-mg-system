<?php

namespace App\Http\Controllers;

use App\Models\products_tb;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductsTbController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $data = products_tb::orderBy('id', 'desc')->get();
        return $data->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     *   fd.append("image", image);
     if($request->hasfile('filename'))
         {

            foreach($request->file('filename') as $image)
            {
                $name=$image->getClientOriginalName();
                $image->move(public_path().'/images/', $name);  
                $data[] = $name;  
            }
         }
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'image' => 'required|image|mimes:png,jpg|max:5048',
            'productName' => 'required|min:3|string|',
            'Product_category' => 'numeric|required',
            'Price' => 'required|numeric',
            'ProductDesc' => 'required|min:5|string',
            'Quantity' => 'required|numeric',
            'Location' => 'string|required',

        ]);
        $file = $request->file('image');
        if ($file) {
            $imagename = uniqid() . '_' . $request->Product_name . '.' . $file->getClientOriginalExtension();
            $file->move(public_path("UProductImages"), $imagename);
        }
        products_tb::create([
            'Product_name' => $request->productName,
            'Image_name' => $imagename,
            'Product_owner' => Auth::user()->id,
            'Price' => $request->Price,
            'ProductDesc' => $request->ProductDesc,
            'Quantity' => $request->Quantity,
            'Location' => $request->Location,
            'Product_category' => $request->Product_category
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\products_tb  $products_tb
     * @return \Illuminate\Http\Response
     */
    public function show(products_tb $products_tb)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\products_tb  $products_tb
     * @return \Illuminate\Http\Response
     */
    public function edit(products_tb $products_tb)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\products_tb  $products_tb
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $request->validate([

            'productName' => 'required|min:3|string|',
            'Product_category' => 'numeric|required',
            'Price' => 'required|numeric',
            'ProductDesc' => 'required|min:5|string',
            'Quantity' => 'required|numeric',
            'Location' => 'string|required',

        ]);

        products_tb::where('id', $id)->update([
            'Product_name' => $request->productName,
            'Price' => $request->Price,
            'ProductDesc' => $request->ProductDesc,
            'Quantity' => $request->Quantity,
            'Location' => $request->Location,
            'Product_category' => $request->Product_category
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\products_tb  $products_tb
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $data = products_tb::where('id', $id);
        $data->delete();
    }
}
