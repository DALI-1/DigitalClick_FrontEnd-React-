<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;
    public function Client()
    {
        return $this->hasOne(Client::class,"Client_ID","Client_ID");
    }
    public function server()
    {
        return $this->hasOne(server::class);
    }
    public function VirtualMachine()
    {
        return $this->hasOne(VirtualMachine::class);
    }
    public function Notification()
    {
        return $this->HasMany(Notification::class);
    }
}
