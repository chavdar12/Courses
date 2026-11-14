const { expect } = require('chai');
const { captureLog } = require('./test-helpers/console');

const smallestOfThreeNumbers = require('./01.smallestOfThreeNumbers');
const addAndSubtract = require('./02.addAndSubtract');
const charactersInRange = require('./03.charactersInRange');
const oddAndEvenSum = require('./04.oddAndEvenSum');
const palindromeIntegers = require('./05.palindromeIntegers');
const passwordValidator = require('./06.passwordValidator');
const nxnMatrix = require('./07.nxnMatrix');
const perfectNumber = require('./08.perfectNumber');
const loadingBar = require('./09.loadingBar');
const factorialDivision = require('./10.factorialDivision');

describe('Functions - Exercise', () => {
    it('01. Smallest of Three Numbers', () => {
        expect(captureLog(() => smallestOfThreeNumbers(2, 5, 3))).to.deep.equal(['2']);
        expect(captureLog(() => smallestOfThreeNumbers(600, 342, 123))).to.deep.equal(['123']);
        expect(captureLog(() => smallestOfThreeNumbers(25, 21, 4))).to.deep.equal(['4']);
    });

    it('02. Add and Subtract', () => {
        expect(captureLog(() => addAndSubtract(23, 6, 10))).to.deep.equal(['19']);
        expect(captureLog(() => addAndSubtract(1, 17, 30))).to.deep.equal(['-12']);
        expect(captureLog(() => addAndSubtract(42, 58, 100))).to.deep.equal(['0']);
    });

    it('03. Characters in Range', () => {
        expect(captureLog(() => charactersInRange('a', 'd'))).to.deep.equal(['b c']);
        expect(captureLog(() => charactersInRange('#', ':'))).to.deep.equal(["$ % & ' ( ) * + , - . / 0 1 2 3 4 5 6 7 8 9"]);
        expect(captureLog(() => charactersInRange('C', '#')))
            .to.deep.equal(["$ % & ' ( ) * + , - . / 0 1 2 3 4 5 6 7 8 9 : ; < = > ? @ A B"]);
    });

    it('04. Odd and Even Sum', () => {
        expect(captureLog(() => oddAndEvenSum(1000435))).to.deep.equal(['Odd sum = 9, Even sum = 4']);
        expect(captureLog(() => oddAndEvenSum('3495892137259234'))).to.deep.equal(['Odd sum = 54, Even sum = 22']);
    });

    it('05. Palindrome Integers', () => {
        expect(captureLog(() => palindromeIntegers([123, 323, 421, 121]))).to.deep.equal(['false', 'true', 'false', 'true']);
        expect(captureLog(() => palindromeIntegers([32, 2, 232, 1010]))).to.deep.equal(['false', 'true', 'true', 'false']);
    });

    it('06. Password Validator', () => {
        expect(captureLog(() => passwordValidator('logIn')))
            .to.deep.equal(['Password must be between 6 and 10 characters', 'Password must have at least 2 digits']);
        expect(captureLog(() => passwordValidator('MyPass123'))).to.deep.equal(['Password is valid']);
        expect(captureLog(() => passwordValidator('Pa$s$s')))
            .to.deep.equal(['Password must consist only of letters and digits', 'Password must have at least 2 digits']);
    });

    it('07. NxN Matrix', () => {
        expect(captureLog(() => nxnMatrix(3))).to.deep.equal(['3 3 3', '3 3 3', '3 3 3']);
        expect(captureLog(() => nxnMatrix(2))).to.deep.equal(['2 2', '2 2']);
    });

    it('08. Perfect Number', () => {
        expect(captureLog(() => perfectNumber(6))).to.deep.equal(['We have a perfect number!']);
        expect(captureLog(() => perfectNumber(28))).to.deep.equal(['We have a perfect number!']);
        expect(captureLog(() => perfectNumber(1236498))).to.deep.equal(["It's not so perfect."]);
    });

    it('09. Loading Bar', () => {
        expect(captureLog(() => loadingBar(30))).to.deep.equal(['30% [%%%.......]', 'Still loading...']);
        expect(captureLog(() => loadingBar(50))).to.deep.equal(['50% [%%%%%.....]', 'Still loading...']);
        expect(captureLog(() => loadingBar(100))).to.deep.equal(['100% Complete!', '[%%%%%%%%%%]']);
    });

    it('10. Factorial Division', () => {
        expect(captureLog(() => factorialDivision(5, 2))).to.deep.equal(['60.00']);
        expect(captureLog(() => factorialDivision(6, 2))).to.deep.equal(['360.00']);
    });
});
