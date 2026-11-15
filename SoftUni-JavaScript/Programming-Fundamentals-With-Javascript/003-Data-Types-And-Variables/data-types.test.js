const { expect } = require('chai');
const { captureLog } = require('./test-helpers/console');

const concatenateNames = require('./01.concatenateNames');
const rightPlace = require('./02.rightPlace');
const integerAndFloat = require('./03.integerAndFloat');
const amazingNumbers = require('./04.amazingNumbers');
const gramophone = require('./05.gramophone');
const fuelMoney = require('./06.fuelMoney');
const centuriesToMinutes = require('./07.centuriesToMinutes');
const specialNumbers = require('./08.specialNumbers');
const triplesOfLatinLetters = require('./09.triplesOfLatinLetters');

describe('Data Types and Variables - Lab', () => {
    it('01. Concatenate Names', () => {
        expect(captureLog(() => concatenateNames('John', 'Smith', '->'))).to.deep.equal([
            'John->Smith',
        ]);
        expect(captureLog(() => concatenateNames('Jan', 'White', '<->'))).to.deep.equal([
            'Jan<->White',
        ]);
    });

    it('02. Right Place', () => {
        expect(captureLog(() => rightPlace('Str_ng', 'I', 'Strong'))).to.deep.equal([
            'Not Matched',
        ]);
        expect(captureLog(() => rightPlace('Str_ng', 'i', 'String'))).to.deep.equal(['Matched']);
    });

    it('03. Integer and Float', () => {
        expect(captureLog(() => integerAndFloat(9, 100, 1.1))).to.deep.equal(['110.1 - Float']);
        expect(captureLog(() => integerAndFloat(100, 200, 303))).to.deep.equal(['603 - Integer']);
    });

    it('04. Amazing Numbers', () => {
        expect(captureLog(() => amazingNumbers(1233))).to.deep.equal(['1233 Amazing? True']);
        expect(captureLog(() => amazingNumbers(999))).to.deep.equal(['999 Amazing? False']);
    });

    it('05. Gramophone', () => {
        expect(captureLog(() => gramophone('Black Sabbath', 'Paranoid', 'War Pigs'))).to.deep.equal(
            ['The plate was rotated 167 times.'],
        );
    });

    it('06. Fuel Money', () => {
        expect(captureLog(() => fuelMoney(260, 9, 2.49))).to.deep.equal([
            'Needed money for that trip is 47.559lv.',
        ]);
        expect(captureLog(() => fuelMoney(90, 14, 2.88))).to.deep.equal([
            'Needed money for that trip is 22.176lv.',
        ]);
    });

    it('07. Centuries to Minutes', () => {
        expect(captureLog(() => centuriesToMinutes(1))).to.deep.equal([
            '1 centuries = 100 years = 36524 days = 876576 hours = 52594560 minutes',
        ]);
        expect(captureLog(() => centuriesToMinutes(5))).to.deep.equal([
            '5 centuries = 500 years = 182621 days = 4382904 hours = 262974240 minutes',
        ]);
    });

    it('08. Special Numbers', () => {
        const special = [5, 7, 14];
        expect(captureLog(() => specialNumbers(15))).to.deep.equal(
            Array.from(
                { length: 15 },
                (_, i) => `${i + 1} -> ${special.includes(i + 1) ? 'True' : 'False'}`,
            ),
        );
    });

    it('09. Triples of Latin Letters', () => {
        const printed = captureLog(() => triplesOfLatinLetters(3));
        expect(printed).to.have.lengthOf(27);
        expect(printed.slice(0, 4)).to.deep.equal(['aaa', 'aab', 'aac', 'aba']);
        expect(printed.at(-1)).to.equal('ccc');
    });
});
