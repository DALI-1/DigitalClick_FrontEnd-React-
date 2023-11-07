<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    use HasFactory;
    protected $table='emails';
    protected $primaryKey='Email_ID';
    protected $fillable = ['Email','Email_OwnerID'];
    
    public function User()
    {
        return $this->belongsTo(User::class);
    }
}
