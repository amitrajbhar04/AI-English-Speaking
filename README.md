# AI English Speaking Course (Laravel + React)

Ek hi project ke andar Laravel backend + React frontend (Vite ke through integrated).

## Folder Structure

```
ai-english-course/
├── app/
│   ├── Http/Controllers/Api/
│   │   ├── AuthController.php          -> register, login, logout
│   │   ├── CourseController.php        -> list/show courses
│   │   ├── LessonController.php        -> show a lesson
│   │   ├── SpeechEvaluationController.php  -> CORE: sends spoken text to Gemini AI
│   │   └── ProgressController.php      -> user's score history
│   └── Models/
│       ├── User.php, Course.php, Lesson.php, Attempt.php
├── config/services.php                 -> Gemini API key config
├── database/migrations/                -> courses, lessons, attempts tables
├── routes/
│   ├── api.php                         -> all /api/* routes
│   └── web.php                         -> serves React app for all other routes
├── resources/
│   ├── views/app.blade.php             -> React ka mount point
│   ├── css/app.css
│   └── js/
│       ├── app.jsx                     -> React entry point
│       ├── App.jsx                     -> routes
│       ├── api/axios.js                -> API client
│       └── pages/
│           ├── Login.jsx, Register.jsx
│           ├── Dashboard.jsx
│           ├── CourseLessons.jsx
│           └── PracticeSpeaking.jsx    -> CORE: mic recording + AI feedback UI
├── composer.json
├── package.json
├── vite.config.js
└── .env.example
```

## Setup Steps (apne local machine par)

1. **Naya Laravel project banao** (yeh sab files uske andar copy/merge kar dena):
   ```bash
   composer create-project laravel/laravel ai-english-course
   cd ai-english-course
   composer require laravel/sanctum
   npm install react react-dom react-router-dom axios
   npm install -D @vitejs/plugin-react laravel-vite-plugin
   ```

2. **Is zip ki files copy karo** apne naye Laravel project mein (same paths pe overwrite karo):
   - `app/`, `config/services.php`, `database/migrations/`, `routes/`, `resources/` — sab merge karo.

3. **.env file banao**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   Phir `.env` mein apna free Gemini API key daalo (`GEMINI_API_KEY`).
   Free key yahan se lo: https://aistudio.google.com/apikey

4. **Sanctum setup**:
   ```bash
   php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
   ```
   `bootstrap/app.php` mein Sanctum middleware add karo (Laravel 11 docs follow karo).

5. **Database migrate karo**:
   ```bash
   php artisan migrate
   ```

6. **Kuch sample courses/lessons daalo** (php artisan tinker se ya seeder banao):
   ```php
   $course = App\Models\Course::create(['title' => 'Daily Conversation', 'level' => 'beginner']);
   App\Models\Lesson::create([
       'course_id' => $course->id,
       'title' => 'Greeting Someone',
       'expected_text' => 'Good morning, how are you today?',
       'difficulty' => 'easy',
       'order' => 1,
   ]);
   ```

7. **Run karo**:
   ```bash
   npm run dev          # Vite dev server (frontend)
   php artisan serve    # Laravel server (backend) - dusre terminal mein
   ```
   Browser mein kholo: http://localhost:8000

## Important Notes

- **Speech-to-Text aur Text-to-Speech**: Browser ka built-in `Web Speech API` use ho raha hai (`PracticeSpeaking.jsx` mein) — 100% free, koi extra setup nahi. Best kaam karta hai Chrome/Edge mein.
- **AI Evaluation**: Google Gemini free tier API use ho raha hai grammar/pronunciation feedback ke liye.
- **Auth**: Laravel Sanctum token-based auth (localStorage mein token store hota hai).
- Production mein jaane se pehle: rate limiting lagao `/api/evaluate-speech` route pe, taaki Gemini free quota jaldi khatam na ho.