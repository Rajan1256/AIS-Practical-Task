<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            ['name' => 'IT'],
            ['name' => 'Computer'],
            ['name' => 'Mech'],
            ['name' => 'Civil'],
        ];
        
        foreach ($departments as $department) {
            Department::create($department);
        }
    }
}