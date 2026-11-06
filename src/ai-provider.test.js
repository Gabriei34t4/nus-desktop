const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const Module = require('node:module');

const userData = fs.mkdtempSync(path.join(os.tmpdir(), 'nus-ai-provider-'));
const originalLoad = Module._load;
Module._load = function (request, ...args) {
  if (request === 'electron') {
    return {
      app: { getPath: () => userData },
      safeStorage: { isEncryptionAvailable: () => false }
    };
  }
  return originalLoad.call(this, request, ...args);
};
const ai = require('./ai');
const secrets = require('./secrets');
secrets.init(userData);
Module._load = originalLoad;

test.after(() => fs.rmSync(userData, { recursive: true, force: true }));

test('only the three requested AI providers are available', () => {
  assert.deepEqual(ai.PROVIDERS, ['gemini', 'nvidia', 'freellmapi']);
});

test('FreeLLMAPI saves its OpenAI-compatible URL and routing model', () => {
  const result = ai.setProvider('freellmapi', {
    baseURL: 'http://127.0.0.1:3001/v1/',
    model: 'auto:smart'
  });
  assert.equal(result.ok, true);
  const status = ai.status();
  assert.equal(status.provider, 'freellmapi');
  assert.equal(status.baseURL, 'http://127.0.0.1:3001/v1');
  assert.equal(status.model, 'auto:smart');
});

test('API keys are stored separately for each provider and can be cleared', () => {
  assert.equal(ai.setApiKey('nvidia-test-key', 'nvidia', {
    model: 'meta/llama-3.2-11b-vision-instruct'
  }).ok, true);
  assert.equal(secrets.getSecret('ai_nvidia_api_key'), 'nvidia-test-key');
  assert.equal(ai.status().provider, 'nvidia');
  assert.equal(ai.status().apiKey, true);
  ai.clearApiKey('nvidia');
  assert.equal(secrets.getSecret('ai_nvidia_api_key'), null);
});

test('syllabus JSON is parsed into a safe, bounded structure', () => {
  const result = ai.parseModelJson(JSON.stringify({
    course: { name: 'Matemática', code: 'MAT10', credit_hours: 3, term: '2026' },
    grade_weights: [{ category: 'Testes', weight_pct: 70 }],
    assignments: [{ title: 'Teste 1', due_date: '2026-11-20', category: 'Testes' }]
  }));
  assert.equal(result.course.name, 'Matemática');
  assert.equal(result.grade_weights[0].weight_pct, 70);
  assert.equal(result.assignments[0].due_date, '2026-11-20');
  assert.deepEqual(ai.parseModelJson('not json'), { error: 'bad_json' });
});
