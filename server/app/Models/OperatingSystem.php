<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OperatingSystem extends Model
{
    use HasFactory;
    protected $table='operating_systems';
    protected $primaryKey='OperatingSystem_ID';
    protected $fillable = ['OperatingSystem_Company','OperatingSystem_Name'];
    public function Server()
    {
        return $this->belongsTo(Server::class);
    }
}
