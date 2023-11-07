<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CPhoneNumber extends Model
{
    use HasFactory;
    protected $primaryKey='ID_Phone_Number';
    public function User()
    {
        return $this->belongsTo(Client::class,"Client_ID","PhoneOwnerID");
    }
}
