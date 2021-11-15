<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTbsTable extends Migration
{
    /**
     * Run the migrations.
     *Product_id
Product_name
Image_name
Price
Quality
Quantity
Location
Rating
Product_category

     * @return void
     */
    public function up()
    {
        Schema::create('products_tbs', function (Blueprint $table) {
            $table->id();
            $table->string("Product_name");
            $table->string("Image_name");
            $table->double("Price");
            $table->string("Quality");
            $table->string("Quantity");
            $table->string("Location");
            $table->integer("Rating");
            $table->integer("Product_category");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products_tbs');
    }
}
