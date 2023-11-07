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
        Schema::create('server_v_m_partitions', function (Blueprint $table) {
            $table->increments("ServerVMPartition_ID");
            
            $table->unsignedInteger("OperatingSystem_ID");
            $table->String("PartitionName");
            $table->unsignedInteger("Server_ID");
            
            $table->String("SVMP_IP_Adress");
            $table->String("Backup");
            $table->String("SVMP_MAC_Adress");
            $table->integer("Nb_Allocated_Cores");
            $table->integer("Allocated_RAM");
            $table->String("Description");
            
            $table->foreign("OperatingSystem_ID")->references("OperatingSystem_ID")->on("operating_systems");
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
        Schema::dropIfExists('server_v_m_partitions');
    }
};
