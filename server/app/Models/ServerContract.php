<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServerContract extends Model
{
    protected $table='server_contracts';
    protected $primaryKey='SContract_ID';
    use HasFactory;
}
