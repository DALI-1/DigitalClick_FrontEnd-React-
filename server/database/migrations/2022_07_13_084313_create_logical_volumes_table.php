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
        Schema::create('logical_volumes', function (Blueprint $table) {
            $table->increments("VL_ID");
            $table->string("VL_Name");
            $table->string("Total_Size");
            $table->unsignedInteger("Server_ID");
            $table->foreign("Server_ID")->references("Server_ID")->on("servers");
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
        Schema::dropIfExists('logical_volumes');
    }
};
