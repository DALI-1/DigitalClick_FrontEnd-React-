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
        Schema::create('servers', function (Blueprint $table) {
            $table->increments("Server_ID");
            $table->unsignedInteger("Service_Provider_ID");
            $table->string("Server_Name");
            $table->string("Server_IP_Adress");
            $table->string("Server_MAC_Adress");
            $table->string("Server_Country");
            $table->string("Server_Location");           
            $table->unsignedInteger("Server_OperatingSystem_ID");
            $table->integer("Nb_Sockets");
            $table->integer("Nb_Cores");
            $table->integer("Nb_Harddrive");
            $table->string("RAM");
            $table->string("BIOS");
            $table->string("Backup");
            $table->foreign("Service_Provider_ID")->references("Service_Provider_ID")->on("service_providers");
            $table->foreign("Server_OperatingSystem_ID")->references("OperatingSystem_ID")->on("operating_systems");
            $table->string("Description");
            $table->string("NextFacturationDate");
            $table->string("PaymentType");
            $table->string("Server_Type");
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
        Schema::dropIfExists('servers');
    }
};
