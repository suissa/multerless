import { test } from 'node:test';
import assert from 'node:assert';
import multer, { MulterError, setLocale } from '../dist/index.js';

test('i18n', async (t) => {
  await t.test('should return default english message', () => {
    setLocale('en');
    const error = new MulterError('LIMIT_FILE_SIZE');
    assert.strictEqual(error.message, 'File too large');
  });

  await t.test('should return german message', () => {
    setLocale('de');
    const error = new MulterError('LIMIT_FILE_SIZE');
    assert.strictEqual(error.message, 'Datei zu groß');
  });

  await t.test('should return spanish message', () => {
    setLocale('es');
    const error = new MulterError('LIMIT_FILE_SIZE');
    assert.strictEqual(error.message, 'Archivo demasiado grande');
  });

  await t.test('should fallback to english if locale not found (or rather stay on previous if setLocale is ignored, but here setLocale checks validity)', () => {
    setLocale('en');
    // @ts-ignore
    setLocale('invalid');
    const error = new MulterError('LIMIT_FILE_SIZE');
    assert.strictEqual(error.message, 'File too large');
  });

  await t.test('should handle japanese message', () => {
    setLocale('ja');
    const error = new MulterError('LIMIT_PART_COUNT');
    assert.strictEqual(error.message, 'パート数が多すぎます');
  });
  
  // Reset locale to english for other tests
  setLocale('en');
});
