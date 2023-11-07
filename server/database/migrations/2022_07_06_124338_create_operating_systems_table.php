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
        Schema::create('operating_systems', function (Blueprint $table) {
            
            $table->increments("OperatingSystem_ID");
            $table->unsignedInteger("OperatingSystemProvider_ID");

            $table->foreign("OperatingSystemProvider_ID")->references("OperatingSystemProvider_ID")->on("operating_system_providers");
           
            $table->string("OperatingSystem_Name");
            
           
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
        Schema::dropIfExists('operating_systems');
    }
};
