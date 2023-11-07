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
        Schema::create('users', function (Blueprint $table) {
            $table->id("ID_Person");
            $table->string('Username');
            $table->string('First_Name');
            $table->string('Last_Name');
            $table->string('PFP_URL');
            $table->string('Role');
            $table->string('Poste');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('Password');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
