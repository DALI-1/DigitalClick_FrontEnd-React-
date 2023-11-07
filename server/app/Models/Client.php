<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    protected $primaryKey='Client_ID';
    public function CPhoneNumbers()
    {
        return $this->hasMany(CPhoneNumber::class,"PhoneOwnerID","Client_ID");
    }
    public function CEmails()
    {
        return $this->hasMany(CEmail::class,"Email_OwnerID");
    }
    public function Contracts()
    {
        return $this->hasMany(Contract::class,"Client_ID");
    }
}
