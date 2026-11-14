const { expect } = require('chai');
const { captureLog } = require('./test-helpers/console');

const sumDigits = require('./01.sumDigits');
const charsToString = require('./02.charsToString');
const townInfo = require('./03.townInfo');
const convertMetersToKilometres = require('./04.convertMetersToKilometres');
const poundsToDollars = require('./05.poundsToDollars');
const reversedChars = require('./06.reversedChars');
const lowerOrUpper = require('./07.lowerOrUpper');
const calculator = require('./08.calculator');
const gladiatorExpenses = require('./09.gladiatorExpenses');
const spiceMustFlow = require('./10.spiceMustFlow');

describe('Data Types and Variables - Exercise', () => {
    it('01. Sum Digits', () => {
        expect(captureLog(() => sumDigits(245678))).to.deep.equal(['32']);
        expect(captureLog(() => sumDigits(97561))).to.deep.equal(['28']);
        expect(captureLog(() => sumDigits(543))).to.deep.equal(['12']);
    });

    it('02. Chars to String', () => {
        expect(captureLog(() => charsToString('a', 'b', 'c'))).to.deep.equal(['abc']);
        expect(captureLog(() => charsToString('%', '2', 'o'))).to.deep.equal(['%2o']);
    });

    it('03. Town Info', () => {
        expect(captureLog(() => townInfo('Sofia', 1286383, 492)))
            .to.deep.equal(['Town Sofia has population of 1286383 and area 492 square km.']);
    });

    it('04. Convert Meters to Kilometres', () => {
        expect(captureLog(() => convertMetersToKilometres(1852))).to.deep.equal(['1.85']);
        expect(captureLog(() => convertMetersToKilometres(798))).to.deep.equal(['0.80']);
    });

    it('05. Pounds to Dollars', () => {
        expect(captureLog(() => poundsToDollars(80))).to.deep.equal(['104.800']);
        expect(captureLog(() => poundsToDollars(39))).to.deep.equal(['51.090']);
    });

    it('06. Reversed Chars', () => {
        expect(captureLog(() => reversedChars('A', 'B', 'C'))).to.deep.equal(['C B A']);
        expect(captureLog(() => reversedChars('1', 'L', '&'))).to.deep.equal(['& L 1']);
    });

    it('07. Lower or Upper', () => {
        expect(captureLog(() => lowerOrUpper('L'))).to.deep.equal(['upper-case']);
        expect(captureLog(() => lowerOrUpper('f'))).to.deep.equal(['lower-case']);
    });

    it('08. Calculator', () => {
        expect(captureLog(() => calculator(5, '+', 10))).to.deep.equal(['15.00']);
        expect(captureLog(() => calculator(25.5, '-', 3))).to.deep.equal(['22.50']);
    });

    it('09. Gladiator Expenses', () => {
        expect(captureLog(() => gladiatorExpenses(7, 2, 3, 4, 5))).to.deep.equal(['Gladiator expenses: 16.00 aureus']);
        expect(captureLog(() => gladiatorExpenses(23, 12.5, 21.5, 40, 200))).to.deep.equal(['Gladiator expenses: 608.00 aureus']);
    });

    it('10. Spice Must Flow', () => {
        expect(captureLog(() => spiceMustFlow(111))).to.deep.equal(['2', '134']);
        expect(captureLog(() => spiceMustFlow(50))).to.deep.equal(['0', '0']);
    });
});
