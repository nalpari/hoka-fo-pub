import assert from 'node:assert/strict';
import test from 'node:test';
import {
  isValidEmail,
  isValidEmailLocalPart,
  isValidEmailDomain,
} from '../src/shared/lib/emailValidation.ts';

test('email validation accepts the same address as the separate registration fields', () => {
  for (const address of [
    'demo@example.com',
    'first.last+tag@example.co.kr',
    'demo@sub-domain.example.com',
  ]) {
    const [localPart, domain] = address.split('@');
    assert.equal(isValidEmail(address), true, address);
    assert.equal(isValidEmailLocalPart(localPart), true, localPart);
    assert.equal(isValidEmailDomain(domain), true, domain);
  }
  assert.equal(isValidEmail(' demo@example.com '), true);
});

test('email validation rejects empty dot segments, invalid domains, and extra separators', () => {
  for (const address of [
    '',
    'demo',
    'demo@example',
    '.demo@example.com',
    'demo.@example.com',
    'first..last@example.com',
    'demo@-example.com',
    'demo@example-.com',
    'demo@exam_ple.com',
    'demo@@example.com',
    'demo @example.com',
    'demo@example..com',
  ]) {
    assert.equal(isValidEmail(address), false, address);
  }
});

test('email validation enforces local-part and domain label length boundaries', () => {
  assert.equal(isValidEmailLocalPart('a'.repeat(64)), true);
  assert.equal(isValidEmailLocalPart('a'.repeat(65)), false);
  assert.equal(isValidEmailDomain(`${'a'.repeat(63)}.com`), true);
  assert.equal(isValidEmailDomain(`${'a'.repeat(64)}.com`), false);
});
