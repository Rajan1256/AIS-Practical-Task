<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\State;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    public function run(): void
    {
        $citiesByState = [
            'Gujarat' => [
                'Ahmedabad',
                'Surat',
                'Vadodara'
            ],
            'Maharashtra' => [
                'Mumbai',
                'Pune',
                'Nagpur'
            ],
            'Punjab' => [
                'Ludhiana',
                'Amritsar',
                'Jalandhar'
            ],
            'Karnataka' => [
                'Bengaluru',
                'Mysuru',
                'Hubballi-Dharwad'
            ],
            'Rajasthan' => [
                'Jaipur',
                'Jodhpur',
                'Kota'
            ],
        ];

        foreach ($citiesByState as $stateName => $cities) {
            $state = State::where('name', $stateName)->first();

            if ($state) {
                foreach ($cities as $cityName) {
                    City::create([
                        'name' => $cityName,
                        'state_id' => $state->id
                    ]);
                }
            }
        }
    }
}
