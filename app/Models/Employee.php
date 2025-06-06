<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'first_name', 
        'last_name', 
        'email', 
        'phone', 
        'department_id', 
        'city_id', 
        'state_id', 
        'salary', 
        'active'
    ];
    
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
    
    public function city()
    {
        return $this->belongsTo(City::class);
    }
    
    public function state()
    {
        return $this->belongsTo(State::class);
    }
}