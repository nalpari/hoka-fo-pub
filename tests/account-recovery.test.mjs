import assert from 'node:assert/strict';
import test from 'node:test';
import { URL } from 'node:url';
import {
  isValidPassword,
  passwordRequirementsMessage,
  validatePasswordReset,
} from '../src/lib/passwordValidation.ts';
import { formatPhoneNumber, getPhoneDigits, isValidPhone } from '../src/lib/phoneNumber.ts';
import { localeRegions } from '../src/app/locales/locales.data.ts';

test('password reset distinguishes required fields, strength, and confirmation', () => {
  assert.deepEqual(validatePasswordReset('', ''), {
    password: passwordRequirementsMessage,
    confirmation: '비밀번호를 다시 입력해 주세요.',
  });
  assert.deepEqual(validatePasswordReset('Hoka1234567!', 'Hoka1234567!'), {});
  for (const password of [
    'Hoka1234!',
    'Hoka12345678!',
    'Hokaabcdefgh!',
    '12345678901!',
    'Hoka12345678',
    'Hoka 1234567!',
  ]) {
    assert.ok(validatePasswordReset(password, password).password);
  }
  const mismatch = validatePasswordReset('Hoka1234567!', 'Hoka1234567?');
  assert.equal(mismatch.password, undefined);
  assert.ok(mismatch.confirmation);
});

test('shared password policy accepts only 10–12 characters with all three character types', () => {
  for (const password of ['Hoka12345!', 'Hoka123456!', 'Hoka1234567!']) {
    assert.equal(isValidPassword(password), true, password);
    assert.deepEqual(validatePasswordReset(password, password), {});
  }
  for (const password of [
    '',
    '12345678',
    'Hoka1234!',
    'Hoka12345678!',
    'Hoka123456',
    '123456789!',
    'HokaHoka!!',
    'Hoka1234 !',
    'Hoka1234!\t',
    'Hoka12345!\n',
  ]) {
    assert.equal(isValidPassword(password), false, JSON.stringify(password));
    assert.equal(validatePasswordReset(password, password).password, passwordRequirementsMessage);
  }
});

test('phone formatting preserves partial input, strips punctuation, and limits digits', () => {
  assert.equal(formatPhoneNumber('01'), '01');
  assert.equal(formatPhoneNumber('0101'), '010-1');
  assert.equal(formatPhoneNumber('0101234'), '010-1234');
  assert.equal(formatPhoneNumber('010-1234-5678'), '010-1234-5678');
  assert.equal(getPhoneDigits('a010-1234-56789'), '01012345678');
  assert.equal(isValidPhone('011-123-4567'), true);
  assert.equal(isValidPhone('010-1234-5678'), true);
  assert.equal(isValidPhone('012-1234-5678'), false);
  assert.equal(isValidPhone('010-123-456'), false);
});

test('shipping regions have valid unique accessible IDs and distinct language links', () => {
  const ids = localeRegions.map(({ id }) => id);
  assert.equal(new Set(ids).size, ids.length);
  for (const region of localeRegions) {
    assert.match(region.id, /^[a-z]+(?:-[a-z]+)*$/);
    assert.ok(region.countries.length > 0);
    const links = region.countries.map(({ code, label, href }) => {
      assert.match(code, /^[a-z]{2}$/);
      assert.ok(label);
      assert.equal(new URL(href).protocol, 'https:');
      return `${label}-${href}`;
    });
    assert.equal(new Set(links).size, links.length);
  }
  const canada = localeRegions
    .flatMap(({ countries }) => countries)
    .filter(({ code }) => code === 'ca');
  assert.equal(canada.length, 2);
  assert.equal(new Set(canada.map(({ href }) => href)).size, 2);
});
