<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\user;

class FetchUsers extends Controller
{
     public function index (){
        $data = user::orderBy('id', 'desc')->get();
        return $data->toJson();
     }
}
