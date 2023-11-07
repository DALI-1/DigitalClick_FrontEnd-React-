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
        Schema::create('p_contract_notifications', function (Blueprint $table) {
            $table->increments("Notification_ID");
            $table->unsignedInteger("PContract_ID");

            $table->string("Notification_Reciever_Specific_User");
            $table->string("Notification_Reciever_Role");
            $table->string("Notification_Description"); 
            $table->string("Notification_Type"); 
            $table->foreign("PContract_ID")->references("PContract_ID")->on("partition_contracts");
            
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
        Schema::dropIfExists('p_contract_notifications');
    }
};
