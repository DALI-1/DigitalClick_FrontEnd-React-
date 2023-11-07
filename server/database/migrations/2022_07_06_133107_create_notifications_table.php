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
       /* Schema::create('notifications', function (Blueprint $table) {
            
           $table->increments("Notification_ID");
            $table->unsignedInteger("Contract_ID");

            $table->unsignedBigInteger("Notification_Reciever_Specific_User");
            $table->string("Notification_Reciever_Role");
            $table->string("Notification_Description"); 
            $table->string("Notification_Type"); 
            $table->foreign("Contract_ID")->references("Contract_ID")->on("contracts")->onDelete('cascade');
            $table->foreign("Notification_Reciever_Specific_User")->references("ID_Person")->on("users")->onDelete('cascade');
            $table->timestamps();
        });*/
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notifications');
    }
};
