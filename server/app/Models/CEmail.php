<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CEmail extends Model
{
    use HasFactory;
    protected $primaryKey='Email_ID';
    public function Client()
    {
        return $this->belongsTo(Client::class);
    }
}
