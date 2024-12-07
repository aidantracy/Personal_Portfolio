import sanitization from '../js/sanitization.js';

QUnit.module('Utility Functions', function() {
    QUnit.test('sanitizeText is a function', function(assert) {
        assert.ok(typeof sanitization === 'function', 'sanitization is a function');
    });

    QUnit.test('sanitizeText removes unsafe characters', function(assert) {
        var sani = new sanitization();
        const dirtyText = '<script>alert("xss");</script>';
        const cleanText = sani.sanitizeText(dirtyText);
        assert.false(cleanText.includes('<script>'), 'Script tags should be removed');
        assert.false(cleanText.includes(';'), 'Semicolons should be removed');
    });

    QUnit.test('sanitizeURL validates URL', function(assert) {
        var sani = new sanitization();
        const validURL = 'https://example.com/';
        assert.equal(sani.sanitizeURL(validURL), validURL, 'Valid URL should remain unchanged');
    });

    QUnit.test('sanitizeURL invalidates URL', function(assert) {
        var sani = new sanitization();
        const invalidURL = 'not-a-url';
        assert.equal(sani.sanitizeURL(invalidURL), '', 'Invalid URL should return empty string');
    });
});
