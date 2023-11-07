<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    public function Sender()
    {
        return $this->HasOne(user::class);
    }
    public function Receiver()
    {
        return $this->HasOne(user::class);
    }
}
