const { expect } = require('chai');
const { captureLog } = require('./test-helpers/console');

const addAndSubtract = require('./01.addAndSubtract');
const commonElements = require('./02.commonElements');
const mergeArrays = require('./03.mergeArrays');
const arrayRotation = require('./04.arrayRotation');
const maxNumber = require('./05.maxNumber');
const equalSums = require('./06.equalSums');
const maxSequenceOfEqualElements = require('./07.maxSequenceOfEqualElements');
const magicSum = require('./08.magicSum');
const dungeonestDark = require('./09.dungeonestDark');
const ladybugs = require('./10.ladybugs');

describe('Arrays - Exercise', () => {
    it('01. Add and Subtract', () => {
        expect(captureLog(() => addAndSubtract([5, 15, 23, 56, 35]))).to.deep.equal(['[ 5, 14, 21, 59, 31 ]', '134', '130']);
        expect(captureLog(() => addAndSubtract([-5, 11, 3, 0, 2]))).to.deep.equal(['[ -5, 10, 1, 3, 6 ]', '11', '15']);
    });

    it('02. Common Elements', () => {
        expect(captureLog(() => commonElements(['Hey', 'hello', 2, 4, 'Peter', 'e'], ['Petar', 10, 'hey', 4, 'hello', '2'])))
            .to.deep.equal(['hello', '4']);
        expect(captureLog(() => commonElements(['S', 'o', 'f', 't', 'U', 'n', 'i', ' '], ['s', 'o', 'c', 'i', 'a', 'l'])))
            .to.deep.equal(['o', 'i']);
    });

    it('03. Merge Arrays', () => {
        expect(captureLog(() => mergeArrays(['5', '15', '23', '56', '35'], ['17', '22', '87', '36', '11'])))
            .to.deep.equal(['22 - 1522 - 110 - 5636 - 46']);
        expect(captureLog(() => mergeArrays(['13', '12312', '5', '77', '4'], ['22', '333', '5', '122', '44'])))
            .to.deep.equal(['35 - 12312333 - 10 - 77122 - 48']);
    });

    it('04. Array Rotation', () => {
        expect(captureLog(() => arrayRotation([51, 47, 32, 61, 21], 2))).to.deep.equal(['32 61 21 51 47']);
        expect(captureLog(() => arrayRotation([32, 21, 61, 1], 4))).to.deep.equal(['32 21 61 1']);
        expect(captureLog(() => arrayRotation([2, 4, 15, 31], 5))).to.deep.equal(['4 15 31 2']);
    });

    it('05. Max Number', () => {
        expect(captureLog(() => maxNumber([1, 4, 3, 2]))).to.deep.equal(['4 3 2']);
        expect(captureLog(() => maxNumber([14, 24, 3, 19, 15, 17]))).to.deep.equal(['24 19 17']);
        expect(captureLog(() => maxNumber([41, 41, 34, 20]))).to.deep.equal(['41 34 20']);
        expect(captureLog(() => maxNumber([27, 19, 42, 2, 13, 45, 48]))).to.deep.equal(['48']);
    });

    it('06. Equal Sums', () => {
        expect(captureLog(() => equalSums([1, 2, 3, 3]))).to.deep.equal(['2']);
        expect(captureLog(() => equalSums([1, 2]))).to.deep.equal(['no']);
        expect(captureLog(() => equalSums([1]))).to.deep.equal(['0']);
        expect(captureLog(() => equalSums([10, 5, 5, 99, 3, 4, 2, 5, 1, 1, 4]))).to.deep.equal(['3']);
    });

    it('07. Max Sequence of Equal Elements', () => {
        expect(captureLog(() => maxSequenceOfEqualElements([2, 1, 1, 2, 3, 3, 2, 2, 2, 1]))).to.deep.equal(['2 2 2']);
        expect(captureLog(() => maxSequenceOfEqualElements([1, 1, 1, 2, 3, 1, 3, 3]))).to.deep.equal(['1 1 1']);
        expect(captureLog(() => maxSequenceOfEqualElements([4, 4, 4, 4]))).to.deep.equal(['4 4 4 4']);
        expect(captureLog(() => maxSequenceOfEqualElements([0, 1, 1, 5, 2, 2, 6, 3, 3]))).to.deep.equal(['1 1']);
    });

    it('08. Magic Sum', () => {
        expect(captureLog(() => magicSum([1, 7, 6, 2, 19, 23], 8))).to.deep.equal(['1 7', '6 2']);
        expect(captureLog(() => magicSum([14, 20, 60, 13, 7, 19, 8], 27))).to.deep.equal(['14 13', '20 7', '19 8']);
        expect(captureLog(() => magicSum([1, 2, 3, 4, 5, 6], 6))).to.deep.equal(['1 5', '2 4']);
    });

    it('09. Dungeonest Dark', () => {
        expect(captureLog(() => dungeonestDark(['rat 10|bat 20|potion 10|rat 10|chest 100|boss 70|chest 1000']))).to.deep.equal([
            'You slayed rat.', 'You slayed bat.', 'You healed for 10 hp.', 'Current health: 80 hp.', 'You slayed rat.',
            'You found 100 coins.', 'You died! Killed by boss.', 'Best room: 6',
        ]);
        expect(captureLog(() => dungeonestDark(['cat 10|potion 30|orc 10|chest 10|snake 25|chest 110']))).to.deep.equal([
            'You slayed cat.', 'You healed for 10 hp.', 'Current health: 100 hp.', 'You slayed orc.', 'You found 10 coins.',
            'You slayed snake.', 'You found 110 coins.', "You've made it!", 'Coins: 120', 'Health: 65',
        ]);
    });

    it('10. Ladybugs', () => {
        expect(captureLog(() => ladybugs([3, '0 1', '0 right 1', '2 right 1']))).to.deep.equal(['0 1 0']);
        expect(captureLog(() => ladybugs([3, '0 1 2', '0 right 1', '1 right 1', '2 right 1']))).to.deep.equal(['0 0 0']);
        expect(captureLog(() => ladybugs([5, '3', '3 left 2', '1 left -2']))).to.deep.equal(['0 0 0 1 0']);
    });
});
