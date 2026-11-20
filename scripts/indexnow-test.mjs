/** Tests for scripts/indexnow.mjs: which addresses get announced, and that the key file matches the key. No network. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { changedArticleUrls, HOST, INDEXNOW_KEY, payload } from './indexnow.mjs';

const md = (fields, body = '## Section\n\nText.') => `---\n${Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n')}\n---\n\n${body}\n`;
const articles = [
  { slug: 'goes-live-today', text: md({ status: 'approved', updated: '2026-11-10', publishOn: '2026-11-16' }) },
  { slug: 'edited-yesterday', text: md({ status: 'live-unreviewed', updated: '2026-11-15' }) },
  { slug: 'old-and-unchanged', text: md({ status: 'live-unreviewed', updated: '2026-10-01' }) },
  { slug: 'scheduled-later', text: md({ status: 'approved', updated: '2026-11-16', publishOn: '2026-11-20' }) },
  { slug: 'in-review', text: md({ status: 'review', updated: '2026-11-16', publishOn: '2026-11-16' }) },
  { slug: 'empty-draft', text: md({ status: 'approved', updated: '2026-11-16' }, '') },
];

const urls = changedArticleUrls(articles, ['2026-11-15', '2026-11-16'], '2026-11-16');
assert.deepEqual(urls, [
  `https://${HOST}/knowledge-base`,
  `https://${HOST}/knowledge-base/goes-live-today`,
  `https://${HOST}/knowledge-base/edited-yesterday`,
], 'only published articles that went live or changed; never scheduled, in-review or empty ones');
assert.deepEqual(changedArticleUrls(articles, ['2026-12-01', '2026-12-02'], '2026-12-02'), [], 'quiet days send nothing');

const body = payload(urls);
assert.equal(body.host, 'www.epicglobalinc.com');
assert.equal(body.keyLocation, `https://www.epicglobalinc.com/${INDEXNOW_KEY}.txt`);
assert.match(INDEXNOW_KEY, /^[a-f0-9]{32}$/);
assert.equal(fs.readFileSync(`public/${INDEXNOW_KEY}.txt`, 'utf8').trim(), INDEXNOW_KEY, 'the public key file holds the key');

console.log('IndexNow tests passed: only live articles that went live or changed are announced, and the key file matches.');
