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
        Schema::create('s_contract_notifications', function (Blueprint $table) {
            $table->increments("Notification_ID");
            $table->unsignedInteger("SContract_ID");

            $table->string("Notification_Reciever_Specific_User");
            $table->string("Notification_Reciever_Role");
            $table->string("Notification_Description"); 
            $table->string("Notification_Type"); 
            $table->foreign("SContract_ID")->references("SContract_ID")->on("server_contracts");
            
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
        Schema::dropIfExists('s_contract_notifications');
    }
};
