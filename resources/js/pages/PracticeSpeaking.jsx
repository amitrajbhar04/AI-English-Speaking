import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios.js';

export default function PracticeSpeaking() {
    const { lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [spokenText, setSpokenText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const recognitionRef = useRef(null);

    useEffect(() => {
        api.get(`/lessons/${lessonId}`).then((res) => setLesson(res.data));

        // Browser ka built-in Speech Recognition (Chrome/Edge) - 100% FREE
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onresult = (event) => {
                const text = event.results[0][0].transcript;
                setSpokenText(text);
            };
            recognition.onend = () => setIsListening(false);
            recognitionRef.current = recognition;
        }
    }, [lessonId]);

    // AI ko sentence bolwao taaki user sun sake correct pronunciation
    const speakText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const startListening = () => {
        if (!recognitionRef.current) {
            alert('Speech recognition is not supported in this browser. Please use Chrome.');
            return;
        }
        setSpokenText('');
        setResult(null);
        setIsListening(true);
        recognitionRef.current.start();
    };

    const submitForEvaluation = async () => {
        if (!spokenText) return;
        setLoading(true);
        try {
            const { data } = await api.post('/evaluate-speech', {
                lesson_id: lessonId,
                spoken_text: spokenText,
            });
            setResult(data);
            // AI ka feedback zor se bhi bol de
            speakText(data.ai_feedback);
        } catch (err) {
            alert('Evaluation failed, please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!lesson) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <h1>{lesson.title}</h1>

            <div style={{ background: '#fff', padding: 20, borderRadius: 8, marginBottom: 20 }}>
                <p style={{ fontSize: 18, marginBottom: 12 }}>
                    Say this sentence out loud: <strong>"{lesson.expected_text}"</strong>
                </p>
                <button onClick={() => speakText(lesson.expected_text)}>
                    🔊 Hear it first
                </button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <button
                    onClick={startListening}
                    disabled={isListening}
                    style={{
                        padding: '16px 32px', borderRadius: 50, border: 'none',
                        background: isListening ? '#e74c3c' : '#3498db', color: '#fff', fontSize: 16,
                    }}
                >
                    {isListening ? '🎙️ Listening...' : '🎤 Start Speaking'}
                </button>
            </div>

            {spokenText && (
                <div style={{ background: '#fff', padding: 16, borderRadius: 8, marginBottom: 16 }}>
                    <p><strong>You said:</strong> {spokenText}</p>
                    <button onClick={submitForEvaluation} disabled={loading}>
                        {loading ? 'Evaluating...' : 'Get AI Feedback'}
                    </button>
                </div>
            )}

            {result && (
                <div style={{ background: '#eafaf1', padding: 16, borderRadius: 8 }}>
                    <h3>Score: {result.score}/100</h3>
                    <p><strong>Corrected version:</strong> {result.corrected_text}</p>
                    <p><strong>Feedback:</strong> {result.ai_feedback}</p>
                </div>
            )}
        </div>
    );
}