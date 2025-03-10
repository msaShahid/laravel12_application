<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            ['name' => 'Web Development'],
            ['name' => 'Artificial Intelligence'],
            ['name' => 'Fitness'],
            ['name' => 'Healthy Eating'],
            ['name' => 'Adventure'],
            ['name' => 'Travel Tips'],
            ['name' => 'Cooking'],
            ['name' => 'Recipes'],
        ];

        DB::table('tags')->insert($tags);
    }
}
