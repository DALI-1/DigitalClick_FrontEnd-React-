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
        Schema::create('c_phone_numbers', function (Blueprint $table) {
            $table->increments("ID_Phone_Number");
            $table->string("Phone_Number");
            $table->unsignedInteger("PhoneOwnerID");

            $table->foreign("PhoneOwnerID")->references("Client_ID")->on("clients");
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
        Schema::dropIfExists('c_phone_numbers');
    }
};
