const { expect } = require('chai');
const { captureLog } = require('./test-helpers/console');

const printCharacters = require('./01.printCharacters');
const substring = require('./02.substring');
const censoredWords = require('./03.censoredWords');
const countStringOccurrences = require('./04.countStringOccurrences');
const stringIterator = require('./05.stringIterator');

describe('Text Processing - Lab', () => {
    it('01. Print Characters', () => {
        expect(captureLog(() => printCharacters('AWord'))).to.deep.equal(['A', 'W', 'o', 'r', 'd']);
    });

    it('02. Substring', () => {
        expect(captureLog(() => substring('ASentance', 1, 8))).to.deep.equal(['Sentance']);
    });

    it('03. Censored Words', () => {
        expect(captureLog(() => censoredWords('A small sentence with some words', 'small')))
            .to.deep.equal(['A ***** sentence with some words']);
    });

    it('04. Count String Occurrences', () => {
        expect(captureLog(() => countStringOccurrences('This is a word and it also is a sentence', 'is'))).to.deep.equal(['2']);
    });

    it('05. String Iterator', () => {
        expect(captureLog(() => stringIterator('Et cillum do voluptate cillum ut cupidatat aliqua.')))
            .to.deep.equal(['Et', 'cillum', 'do', 'voluptate', 'cillum', 'ut', 'cupidatat', 'aliqua.']);
    });
});
