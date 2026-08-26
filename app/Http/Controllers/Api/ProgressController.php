<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    public function index(Request $request)
    {
        $attempts = $request->user()->attempts()->with('lesson')->latest()->get();

        return response()->json([
            'total_attempts' => $attempts->count(),
            'average_score' => round($attempts->avg('score') ?? 0, 1),
            'attempts' => $attempts,
        ]);
    }
}
