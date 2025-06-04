<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\State;

class StateController extends Controller
{
    public function index()
    {
        return State::all();
    }
    
    public function cities(State $state)
    {
        return $state->cities;
    }
}