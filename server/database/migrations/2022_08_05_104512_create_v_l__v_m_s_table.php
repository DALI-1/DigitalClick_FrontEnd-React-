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
        Schema::create('v_l__v_m_s', function (Blueprint $table) {
            $table->increments("ID");
            $table->unsignedInteger("VL_ID");
            $table->unsignedInteger("ServerVMPartition_ID");
            $table->foreign("ServerVMPartition_ID")->references("ServerVMPartition_ID")->on("server_v_m_partitions");
            $table->foreign("VL_ID")->references("VL_ID")->on("logical_volumes");
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
        Schema::dropIfExists('v_l__v_m_s');
    }
};
