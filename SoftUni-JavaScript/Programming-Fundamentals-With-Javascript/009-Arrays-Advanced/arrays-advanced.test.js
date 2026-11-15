const { expect } = require('chai');
const { captureLog } = require('./test-helpers/console');

const sumFirstAndLast = require('./01.sumFirstAndLast');
const negativeOrPositiveNumbers = require('./02.negativeOrPositiveNumbers');
const firstAndLastKNumbers = require('./03.firstAndLastKNumbers');
const lastKNumbersSequence = require('./04.lastKNumbersSequence');
const processOddNumbers = require('./05.processOddNumbers');
const smallestTwoNumbers = require('./06.smallestTwoNumbers');
const listOfProducts = require('./07.listOfProducts');
const arrayManipulations = require('./08.arrayManipulations');

describe('Arrays Advanced - Lab', () => {
    it('01. Sum First and Last', () => {
        expect(captureLog(() => sumFirstAndLast(['20', '30', '40']))).to.deep.equal(['60']);
        expect(captureLog(() => sumFirstAndLast(['5', '10']))).to.deep.equal(['15']);
    });

    it('02. Negative or Positive Numbers', () => {
        expect(captureLog(() => negativeOrPositiveNumbers([7, -2, 8, 9]))).to.deep.equal([
            '-2',
            '7',
            '8',
            '9',
        ]);
        expect(captureLog(() => negativeOrPositiveNumbers([3, -2, 0, -1]))).to.deep.equal([
            '-1',
            '-2',
            '3',
            '0',
        ]);
    });

    it('03. First and Last K Numbers', () => {
        expect(captureLog(() => firstAndLastKNumbers([2, 7, 8, 9]))).to.deep.equal(['7 8', '8 9']);
        expect(captureLog(() => firstAndLastKNumbers([3, 6, 7, 8, 9]))).to.deep.equal([
            '6 7 8',
            '7 8 9',
        ]);
    });

    it('04. Last K Numbers Sequence', () => {
        expect(captureLog(() => lastKNumbersSequence(6, 3))).to.deep.equal(['1 1 2 4 7 13']);
        expect(captureLog(() => lastKNumbersSequence(8, 2))).to.deep.equal(['1 1 2 3 5 8 13 21']);
    });

    it('05. Process Odd Numbers', () => {
        expect(captureLog(() => processOddNumbers([10, 15, 20, 25]))).to.deep.equal(['50 30']);
        expect(captureLog(() => processOddNumbers([3, 0, 10, 4, 7, 3]))).to.deep.equal(['6 8 0']);
    });

    it('06. Smallest Two Numbers', () => {
        expect(captureLog(() => smallestTwoNumbers([30, 15, 50, 5]))).to.deep.equal(['5 15']);
        expect(captureLog(() => smallestTwoNumbers([3, 0, 10, 4, 7, 3]))).to.deep.equal(['0 3']);
    });

    it('07. List of Products', () => {
        expect(
            captureLog(() => listOfProducts(['Potatoes', 'Tomatoes', 'Onions', 'Apples'])),
        ).to.deep.equal(['1.Apples', '2.Onions', '3.Potatoes', '4.Tomatoes']);
    });

    it('08. Array Manipulations', () => {
        expect(
            captureLog(() =>
                arrayManipulations([
                    '4 19 2 53 6 43',
                    'Add 3',
                    'Remove 2',
                    'RemoveAt 1',
                    'Insert 8 3',
                ]),
            ),
        ).to.deep.equal(['4 53 6 8 43 3']);
    });
});
