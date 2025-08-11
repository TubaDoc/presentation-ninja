import React, { useState } from 'react';
import { callGeminiAPI } from './callGeminiAPI'; // adjust path if needed

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    setAnswer('');
    try {
      const result = await callGeminiAPI(prompt);
      // result may be string or object – handle both
      setAnswer(typeof result === 'string' ? result : JSON.stringify(result, null, 2));
    } catch (err) {
      setError(err.message || 'Error calling Gemini');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'system-ui, Arial, sans-serif' }}>
      <h1>Presentation Ninja</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <textarea
          rows={4}
          placeholder="Enter a prompt for Gemini..."
          value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem', resize: 'vertical' }}
        />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit" disabled={loading || !prompt.trim()}>
            {loading ? 'Thinking...' : 'Send'}
          </button>
          <button
            type="button"
            onClick={() => {
              setPrompt('');
              setAnswer('');
              setError('');
            }}
            disabled={loading && !error && !answer}
          >
            Clear
          </button>
        </div>
      </form>

      {error && (
        <div style={{ marginTop: '1rem', color: 'white', background: '#c0392b', padding: '0.75rem' }}>
          Error: {error}
        </div>
      )}

      {answer && !error && (
        <pre
          style={{
            marginTop: '1rem',
            background: '#1e1e1e',
            color: '#dcdcdc',
            padding: '0.75rem',
            whiteSpace: 'pre-wrap',
            borderRadius: 4,
          }}
        >
          {answer}
        </pre>
      )}
    </div>
  );
}