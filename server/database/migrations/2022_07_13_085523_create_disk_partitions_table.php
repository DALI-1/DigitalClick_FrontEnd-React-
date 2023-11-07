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
        Schema::create('disk_partitions', function (Blueprint $table) {
            $table->increments("DiskP_ID");
            $table->string("PartitionValue");
            $table->string("PartitionUsage");
            $table->unsignedInteger("Disk_ID");
            $table->unsignedInteger("ServerVMPartition_ID");
            
            $table->foreign("Disk_ID")->references("Disk_ID")->on("disks");

            $table->foreign("ServerVMPartition_ID")->references("ServerVMPartition_ID")->on("server_v_m_partitions");
            
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
        Schema::dropIfExists('disk_partitions');
    }
};
