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
       /* Schema::create('contracts', function (Blueprint $table) {
            $table->increments("Contract_ID");
            $table->unsignedInteger("Server_ID");
            $table->unsignedInteger("VM_ID");
            $table->unsignedInteger("Client_ID");
            $table->string("Next_Facturation_Date");
            $table->string("Backup");
            $table->string("SSL_Ending_Date");
            $table->string("Access_status_Temppass");
            $table->integer("Rent_price"); 
            $table->string("Payment_Type");
            $table->timestamps();
            $table->foreign("Server_ID")->references("Server_ID")->on("servers")->onDelete('cascade');
            $table->foreign("VM_ID")->references("VM_ID")->on("virtual_machines")->onDelete('cascade');
            $table->foreign("Client_ID")->references("Client_ID")->on("clients")->onDelete('cascade');
        });*/
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contracts');
    }
};
