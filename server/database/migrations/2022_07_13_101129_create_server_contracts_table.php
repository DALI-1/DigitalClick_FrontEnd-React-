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
        Schema::create('server_contracts', function (Blueprint $table) {
            $table->increments("SContract_ID");
            $table->unsignedInteger("Server_ID");
            
            $table->unsignedInteger("Client_ID");
            $table->timestamps();
            $table->string("Next_Facturation_Date");
            $table->date("Contract_Start_Date");
            
            $table->string("SSL_Ending_Date");
            $table->string("Access_status_Temppass");
            $table->integer("Rent_price"); 
            $table->string("Payment_Type");
            
            $table->foreign("Server_ID")->references("Server_ID")->on("servers");
            
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
        Schema::dropIfExists('server_contracts');
    }
};
