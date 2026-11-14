const { expect } = require('chai');
const { captureLog } = require('./test-helpers/console');

const repeatString = require('./01.repeatString');
const grades = require('./02.grades');
const mathPower = require('./03.mathPower');
const orders = require('./04.orders');
const simpleCalculator = require('./05.simpleCalculator');
const signCheck = require('./06.signCheck');

describe('Functions - Lab', () => {
    it('01. Repeat String', () => {
        expect(captureLog(() => repeatString('abc', 3))).to.deep.equal(['abcabcabc']);
        expect(captureLog(() => repeatString('String', 2))).to.deep.equal(['StringString']);
    });

    it('02. Grades', () => {
        expect(captureLog(() => grades(3.33))).to.deep.equal(['Poor (3.33)']);
        expect(captureLog(() => grades(4.5))).to.deep.equal(['Very good (4.50)']);
        expect(captureLog(() => grades(2.99))).to.deep.equal(['Fail (2)']);
    });

    it('03. Math Power', () => {
        expect(captureLog(() => mathPower(2, 8))).to.deep.equal(['256']);
        expect(captureLog(() => mathPower(3, 4))).to.deep.equal(['81']);
    });

    it('04. Orders', () => {
        expect(captureLog(() => orders('water', 5))).to.deep.equal(['5.00']);
        expect(captureLog(() => orders('coffee', 2))).to.deep.equal(['3.00']);
    });

    it('05. Simple Calculator', () => {
        expect(captureLog(() => simpleCalculator(5, 5, 'multiply'))).to.deep.equal(['25']);
        expect(captureLog(() => simpleCalculator(40, 8, 'divide'))).to.deep.equal(['5']);
        expect(captureLog(() => simpleCalculator(12, 19, 'add'))).to.deep.equal(['31']);
        expect(captureLog(() => simpleCalculator(50, 13, 'subtract'))).to.deep.equal(['37']);
    });

    it('06. Sign Check', () => {
        expect(captureLog(() => signCheck(5, 12, -15))).to.deep.equal(['Negative']);
        expect(captureLog(() => signCheck(-6, -12, 14))).to.deep.equal(['Positive']);
        expect(captureLog(() => signCheck(-1, -2, -3))).to.deep.equal(['Negative']);
        expect(captureLog(() => signCheck(-5, 1, 1))).to.deep.equal(['Negative']);
    });
});
