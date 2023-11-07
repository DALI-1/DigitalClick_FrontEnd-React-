<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhoneNumber extends Model
{
    use HasFactory;
    protected $table='phone_numbers';
    protected $primaryKey='ID_Phone_Number';
    protected $fillable = ['Phone_Number','PhoneOwnerID'];
    
    public function User()
    {
        return $this->belongsTo(User::class);
    }

   
}
