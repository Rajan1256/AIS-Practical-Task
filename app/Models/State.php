<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    use HasFactory;
    
    protected $fillable = ['name'];
    
    public function cities()
    {
        return $this->hasMany(City::class);
    }
    
    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}