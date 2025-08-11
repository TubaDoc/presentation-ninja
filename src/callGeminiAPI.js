// Simple helper to call the Netlify Gemini function.
export async function callGeminiAPI(prompt, schema = null) {
  if (typeof prompt !== 'string' || !prompt.trim()) {
    throw new Error('Prompt must be a non-empty string.');
  }

  const resp = await fetch('/.netlify/functions/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, schema }),
  });

  let json;
  const text = await resp.text();
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Non-JSON response (status ${resp.status}): ${text.slice(0,120)}`);
  }

  if (!resp.ok) {
    throw new Error(json.error || json.message || `Gemini function error (status ${resp.status})`);
  }
  if (!('data' in json)) {
    throw new Error('Response missing "data" property.');
  }
  return json.data;
}