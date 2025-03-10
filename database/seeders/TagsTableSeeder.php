<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
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

        foreach ($tags as &$tag) {
            $tag['slug'] = Str::slug($tag['name']); 
            $tag['created_at'] = now(); 
        }
        DB::table('tags')->insert($tags);
    }
}
