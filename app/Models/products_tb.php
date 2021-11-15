<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class products_tb extends Model
{
    use HasFactory;
/* 
Product_name
Image_name
Price
Quality
Quantity
Location
Rating
Product_category

*/
    protected $fillable= ['Product_name',
     'Image_name',
     'Price'
    ,'Quality',
    'quantity',
    'Location',
    'Rating', 
    'Product_category'];
}
