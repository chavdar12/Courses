const { expect } = require('chai');
const { captureLog } = require('./test-helpers/console');

const sumFirstAndLast = require('./01.sumFirstAndLast');
const dayOfWeek = require('./02.dayOfWeek');
const reverseArrayOfNumbers = require('./03.reverseArrayOfNumbers');
const reverseArrayOfStrings = require('./04.reverseArrayOfStrings');
const sumEvenNumbers = require('./05.sumEvenNumbers');
const evenAndOddSubtraction = require('./06.evenAndOddSubtraction');
const equalArrays = require('./07.equalArrays');
const condenseArrayToNumber = require('./08.condenseArrayToNumber');

describe('Arrays - Lab', () => {
    it('01. Sum First and Last Array Elements', () => {
        expect(captureLog(() => sumFirstAndLast([20, 30, 40]))).to.deep.equal(['60']);
        expect(captureLog(() => sumFirstAndLast([10, 17, 22, 33]))).to.deep.equal(['43']);
    });

    it('02. Day of Week', () => {
        expect(captureLog(() => dayOfWeek(3))).to.deep.equal(['Wednesday']);
        expect(captureLog(() => dayOfWeek(6))).to.deep.equal(['Saturday']);
        expect(captureLog(() => dayOfWeek(11))).to.deep.equal(['Invalid day!']);
    });

    it('03. Reverse an Array of Numbers', () => {
        expect(captureLog(() => reverseArrayOfNumbers(3, [10, 20, 30, 40, 50]))).to.deep.equal(['30 20 10']);
        expect(captureLog(() => reverseArrayOfNumbers(4, [-1, 20, 99, 5]))).to.deep.equal(['5 99 20 -1']);
        expect(captureLog(() => reverseArrayOfNumbers(2, [66, 43, 75, 89, 47]))).to.deep.equal(['43 66']);
    });

    it('04. Reverse an Array of Strings', () => {
        expect(captureLog(() => reverseArrayOfStrings(['a', 'b', 'c', 'd', 'e']))).to.deep.equal(['e d c b a']);
        expect(captureLog(() => reverseArrayOfStrings(['33', '123', '0', 'dd']))).to.deep.equal(['dd 0 123 33']);
    });

    it('05. Sum Even Numbers', () => {
        expect(captureLog(() => sumEvenNumbers(['1', '2', '3', '4', '5', '6']))).to.deep.equal(['12']);
        expect(captureLog(() => sumEvenNumbers(['3', '5', '7', '9']))).to.deep.equal(['0']);
        expect(captureLog(() => sumEvenNumbers(['2', '4', '6', '8', '10']))).to.deep.equal(['30']);
    });

    it('06. Even and Odd Subtraction', () => {
        expect(captureLog(() => evenAndOddSubtraction([1, 2, 3, 4, 5, 6]))).to.deep.equal(['3']);
        expect(captureLog(() => evenAndOddSubtraction([3, 5, 7, 9]))).to.deep.equal(['-24']);
        expect(captureLog(() => evenAndOddSubtraction([2, 4, 6, 8, 10]))).to.deep.equal(['30']);
    });

    it('07. Equal Arrays', () => {
        expect(captureLog(() => equalArrays(['10', '20', '30'], ['10', '20', '30']))).to.deep.equal(['Arrays are identical. Sum: 60']);
        expect(captureLog(() => equalArrays(['1', '2', '3', '4', '5'], ['1', '2', '4', '4', '5'])))
            .to.deep.equal(['Arrays are not identical. Found difference at 2 index']);
        expect(captureLog(() => equalArrays(['1'], ['10']))).to.deep.equal(['Arrays are not identical. Found difference at 0 index']);
    });

    it('08. Condense Array to Number', () => {
        expect(captureLog(() => condenseArrayToNumber([2, 10, 3]))).to.deep.equal(['25']);
        expect(captureLog(() => condenseArrayToNumber([5, 0, 4, 1, 2]))).to.deep.equal(['35']);
        expect(captureLog(() => condenseArrayToNumber([1]))).to.deep.equal(['1']);
    });
});
