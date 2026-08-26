<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        // ---------------- Beginner Course ----------------
        $beginner = Course::create([
            'title' => 'English Speaking Foundations',
            'description' => 'Master basic pronunciation, greetings, and everyday conversation starters with AI feedback.',
            'level' => 'Beginner',
        ]);

        $beginnerLessons = [
            ['title' => 'Greetings & Introductions', 'expected_text' => 'Hello, my name is John. Nice to meet you.', 'difficulty' => 'easy'],
            ['title' => 'Talking About Yourself', 'expected_text' => 'I am from India. I work as a software engineer.', 'difficulty' => 'easy'],
            ['title' => 'Asking Simple Questions', 'expected_text' => 'Excuse me, could you tell me the time, please?', 'difficulty' => 'easy'],
            ['title' => 'Ordering Food', 'expected_text' => 'I would like a cup of coffee and a sandwich, please.', 'difficulty' => 'easy'],
            ['title' => 'Basic Directions', 'expected_text' => 'Could you please tell me how to get to the train station?', 'difficulty' => 'medium'],
        ];

        foreach ($beginnerLessons as $index => $lesson) {
            Lesson::create([
                'course_id' => $beginner->id,
                'title' => $lesson['title'],
                'expected_text' => $lesson['expected_text'],
                'difficulty' => $lesson['difficulty'],
                'order' => $index + 1,
            ]);
        }

        // ---------------- Intermediate Course ----------------
        $intermediate = Course::create([
            'title' => 'Confident Conversations',
            'description' => 'Practice fluent, natural-sounding English for daily life, work, and social situations.',
            'level' => 'Intermediate',
        ]);

        $intermediateLessons = [
            ['title' => 'Job Interview Practice', 'expected_text' => 'I believe my previous experience makes me a strong fit for this role.', 'difficulty' => 'medium'],
            ['title' => 'Expressing Opinions', 'expected_text' => 'In my opinion, remote work has both advantages and disadvantages.', 'difficulty' => 'medium'],
            ['title' => 'Making Small Talk', 'expected_text' => 'The weather has been really unpredictable lately, hasn\'t it?', 'difficulty' => 'medium'],
            ['title' => 'Handling Disagreements', 'expected_text' => 'I understand your point, but I see it a little differently.', 'difficulty' => 'hard'],
            ['title' => 'Phone Conversations', 'expected_text' => 'Could you please repeat that? The line isn\'t very clear.', 'difficulty' => 'medium'],
        ];

        foreach ($intermediateLessons as $index => $lesson) {
            Lesson::create([
                'course_id' => $intermediate->id,
                'title' => $lesson['title'],
                'expected_text' => $lesson['expected_text'],
                'difficulty' => $lesson['difficulty'],
                'order' => $index + 1,
            ]);
        }

        // ---------------- Advanced Course ----------------
        $advanced = Course::create([
            'title' => 'Advanced Fluency & Public Speaking',
            'description' => 'Refine advanced vocabulary, persuasive speech, and public speaking skills with AI-driven scoring.',
            'level' => 'Advanced',
        ]);

        $advancedLessons = [
            ['title' => 'Persuasive Speaking', 'expected_text' => 'Investing in renewable energy is not just beneficial, it is essential for our future.', 'difficulty' => 'hard'],
            ['title' => 'Business Presentations', 'expected_text' => 'Our quarterly revenue has increased by fifteen percent compared to last year.', 'difficulty' => 'hard'],
            ['title' => 'Debating a Topic', 'expected_text' => 'While automation increases efficiency, it also raises concerns about job displacement.', 'difficulty' => 'hard'],
            ['title' => 'Storytelling', 'expected_text' => 'Once upon a time, in a small village, there lived a curious young girl.', 'difficulty' => 'medium'],
            ['title' => 'Impromptu Speaking', 'expected_text' => 'If I could change one thing about my city, it would be the public transportation system.', 'difficulty' => 'hard'],
        ];

        foreach ($advancedLessons as $index => $lesson) {
            Lesson::create([
                'course_id' => $advanced->id,
                'title' => $lesson['title'],
                'expected_text' => $lesson['expected_text'],
                'difficulty' => $lesson['difficulty'],
                'order' => $index + 1,
            ]);
        }
    }
}