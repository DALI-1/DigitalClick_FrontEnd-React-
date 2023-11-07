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
        Schema::create('messages', function (Blueprint $table) {
            $table->increments("Message_ID");
            $table->unsignedBigInteger("Message_Sender_ID");
            $table->unsignedBigInteger("Message_Reciever_ID");
            $table->string("Message Description"); 
            $table->string("Message_Sent_Date"); 
            $table->timestamps();
            $table->foreign("Message_Sender_ID")->references("ID_Person")->on("users");
            $table->foreign("Message_Reciever_ID")->references("ID_Person")->on("users");

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
};
