<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attempt;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SpeechEvaluationController extends Controller
{
    /**
     * Frontend se aata hai:
     * - lesson_id
     * - spoken_text  (jo Web Speech API ne recognize kiya)
     *
     * Yeh function Gemini ko bhejta hai expected_text vs spoken_text
     * compare karne ke liye, aur feedback + score wapas deta hai.
     */
    public function evaluate(Request $request)
    {
        $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
            'spoken_text' => 'required|string',
        ]);

        $lesson = Lesson::findOrFail($request->lesson_id);

        $apiKey = config('services.gemini.key');
        $model = config('services.gemini.model', 'gemini-1.5-flash');

        $prompt = <<<PROMPT
            You are an English speaking coach. A language learner was asked to say this sentence:

            Expected sentence: "{$lesson->expected_text}"

            What they actually said (captured by speech recognition): "{$request->spoken_text}"

            Compare the two. Respond ONLY with valid JSON (no markdown, no extra text) in this exact format:
            {
            "score": <number 0-100 representing how close/correct it was>,
            "corrected_text": "<the corrected, grammatically correct version of what they said>",
            "feedback": "<2-3 short encouraging sentences explaining mistakes in pronunciation-adjacent grammar/word choice, and how to improve>"
            }
            PROMPT;

        $response = Http::post(
            "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}",
            [
                'contents' => [
                    ['parts' => [['text' => $prompt]]],
                ],
            ]
        );

        if ($response->failed()) {
            return response()->json(['message' => 'AI service error, please try again.'], 502);
        }

        $rawText = data_get($response->json(), 'candidates.0.content.parts.0.text', '{}');

        $cleanJson = trim(preg_replace('/```json|```/', '', $rawText));
        $result = json_decode($cleanJson, true) ?? [
            'score' => 0,
            'corrected_text' => $request->spoken_text,
            'feedback' => 'Could not evaluate this attempt, please try again.',
        ];

        $attempt = Attempt::create([
            'user_id' => $request->user()->id,
            'lesson_id' => $lesson->id,
            'spoken_text' => $request->spoken_text,
            'ai_feedback' => $result['feedback'] ?? '',
            'corrected_text' => $result['corrected_text'] ?? '',
            'score' => $result['score'] ?? 0,
        ]);

        return response()->json($attempt);
    }
}
