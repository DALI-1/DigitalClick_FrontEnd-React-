<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VirtualMachine extends Model
{
    use HasFactory;
    protected $primaryKey='VM_ID';
    public function Contract()
    {
        return $this->hasMany(Contract::class);
    }
}
