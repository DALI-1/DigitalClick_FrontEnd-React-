<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Server extends Model
{
    use HasFactory;
    protected $primaryKey='Server_ID';
    public function OperatingSystem()
    {
        return $this->hasOne(OperatingSystem::class);
    }
    public function PartitionContract()
    {
        return $this->hasMany(PartitionContract::class);
    }
    
}
