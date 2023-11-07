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
        Schema::create('c_emails', function (Blueprint $table) {
            $table->increments("Email_ID");
            $table->String("Email");
            $table->unsignedInteger("Email_OwnerID");
            $table->foreign("Email_OwnerID")->references("Client_ID")->on("clients");
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
        Schema::dropIfExists('c_emails');
    }
};
