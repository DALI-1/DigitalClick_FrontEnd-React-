<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    
    public function Receiver()
    {
        return $this->HasOne(user::class);
    }
    public function Contract()
    {
        return $this->HasOne(Contract::class);
    }
    
}
