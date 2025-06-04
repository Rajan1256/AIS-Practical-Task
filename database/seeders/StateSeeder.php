<?php

namespace Database\Seeders;

use App\Models\State;
use Illuminate\Database\Seeder;

class StateSeeder extends Seeder
{
    public function run(): void
    {
        $states = [
            ['name' => 'Gujarat'],
            ['name' => 'Maharashtra'],
            ['name' => 'Punjab'],
            ['name' => 'Karnataka'],
            ['name' => 'Rajasthan'],
        ];

        foreach ($states as $state) {
            State::create($state);
        }
    }
}

