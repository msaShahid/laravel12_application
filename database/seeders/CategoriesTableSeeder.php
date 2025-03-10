<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Technology', 'slug' => 'technology', 'description' => 'All things related to technology'],
            ['name' => 'Health', 'slug' => 'health', 'description' => 'Health and wellness tips'],
            ['name' => 'Travel', 'slug' => 'travel', 'description' => 'Explore the world, travel tips, and guides'],
            ['name' => 'Lifestyle', 'slug' => 'lifestyle', 'description' => 'Lifestyle topics and personal growth'],
            ['name' => 'Food', 'slug' => 'food', 'description' => 'Delicious recipes, cooking tips, and food trends'],
        ];

        DB::table('categories')->insert($categories);
    }
}
