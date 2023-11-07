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
        Schema::create('server_notifications', function (Blueprint $table) {
            $table->id();

            $table->unsignedInteger("Server_ID");
            $table->string("Notification_Reciever_Specific_User");
            $table->string("Notification_Reciever_Role");
            $table->string("Notification_Description"); 
            $table->string("Notification_Type"); 
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
        Schema::dropIfExists('server_notifications');
    }
};
