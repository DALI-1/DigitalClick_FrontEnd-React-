<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
           
            $table->increments("Client_ID");
            $table->String("First_Name");
            $table->String("Last_Name");
            $table->String("Adress");
            $table->String("Company_Name");
            $table->String("C_Nationality");
            $table->String("C_City");
            $table->String("Company_Adress");
            $table->String("ClientPFP");
           
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
        Schema::dropIfExists('clients');
    }
};
