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
        Schema::create('partition_contracts', function (Blueprint $table) {
            $table->increments("PContract_ID");
            $table->unsignedInteger("Server_ID");
            $table->unsignedInteger("ServerVMPartition_ID");
            $table->unsignedInteger("Client_ID");
            $table->timestamps();
            $table->string("Next_Facturation_Date");
            
            $table->string("SSL_Ending_Date");
            $table->string("Access_status_Temppass");
            $table->integer("Rent_price"); 
            $table->string("Payment_Type");
            
            $table->foreign("Server_ID")->references("Server_ID")->on("servers");
            $table->foreign("ServerVMPartition_ID")->references("ServerVMPartition_ID")->on("server_v_m_partitions");
            $table->foreign("Client_ID")->references("Client_ID")->on("clients");

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('partition_contracts');
    }
};
