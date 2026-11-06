// Saved settings beat DEFAULTS on merge, so a model ID that stopped existing
// must be rewritten on load or every Companion answer 404s after an upgrade.
const test = require('node:test');
const assert = require('node:assert');

function loadStore() {
  // store.js needs electron's app/safeStorage at require time; stub them.
  const Module = require('node:module');
  const real = Module._load;
  Module._load = function (req, ...rest) {
    if (req === 'electron') {
      return { app: { getPath: () => require('node:os').tmpdir() }, safeStorage: { isEncryptionAvailable: () => false } };
    }
    return real.call(this, req, ...rest);
  };
  try { return require('../src/store'); } finally { Module._load = real; }
}

test('retired model IDs migrate to the supported provider defaults', () => {
  const store = loadStore();
  const settings = { models: {
    gemini: { fast: 'gemini-2.5-flash', smart: 'gemini-3.6-pro' },
    nvidia: { fast: 'meta/llama-3.3-70b-instruct', smart: 'meta/llama-3.3-70b-instruct' },
    freellmapi: { fast: 'auto', smart: 'auto' },
  } };
  assert.equal(store._retireDeadModels(settings), true);
  assert.deepEqual(settings.models.gemini, { fast: 'gemini-3.8-flash', smart: 'gemini-3.8-flash' });
  assert.deepEqual(settings.models.nvidia, { fast: 'meta/llama-3.2-11b-vision-instruct', smart: 'meta/llama-3.2-11b-vision-instruct' });
  assert.deepEqual(settings.models.freellmapi, { fast: 'auto:fast', smart: 'auto:smart' });
});

test('current model IDs are left alone and report no change', () => {
  const store = loadStore();
  const settings = { models: { gemini: { fast: 'gemini-3.8-flash', smart: 'gemini-3.8-flash' } } };
  assert.equal(store._retireDeadModels(settings), false);
  assert.equal(settings.models.gemini.fast, 'gemini-3.8-flash');
});
