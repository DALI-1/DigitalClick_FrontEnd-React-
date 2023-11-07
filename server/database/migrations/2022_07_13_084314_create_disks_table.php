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
        Schema::create('disks', function (Blueprint $table) {
            $table->increments("Disk_ID");
            $table->string("Disk_Model");
            $table->string("Disk_IMG_URL");
            $table->string("Disk_Type");
            $table->integer("Total_Size");
            $table->unsignedInteger("DProvider_ID");
            $table->unsignedInteger("Server_ID");
            $table->unsignedInteger("VL_ID")->nullable();
            $table->foreign("VL_ID")->references("VL_ID")->on("logical_volumes");
            $table->foreign("Server_ID")->references("Server_ID")->on("servers");

            $table->foreign("DProvider_ID")->references("DProvider_ID")->on("disk_providers");

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
        Schema::dropIfExists('disks');
    }
};
