const { expect } = require('chai');
const { captureLog } = require('./test-helpers/console');

const phoneBook = require('./01.phoneBook');
const meetings = require('./02.meetings');
const addressBook = require('./03.addressBook');
const storage = require('./04.storage');
const schoolGrades = require('./05.schoolGrades');
const wordOccurrences = require('./06.wordOccurrences');
const neighborhoods = require('./07.neighborhoods');

describe('Associative Arrays - Lab', () => {
    it('01. Phone Book', () => {
        expect(
            captureLog(() =>
                phoneBook([
                    'Tim 0834212554',
                    'Peter 0877547887',
                    'Bill 0896543112',
                    'Tim 0876566344',
                ]),
            ),
        ).to.deep.equal(['Tim -> 0876566344', 'Peter -> 0877547887', 'Bill -> 0896543112']);
    });

    it('02. Meetings', () => {
        expect(
            captureLog(() =>
                meetings(['Monday Peter', 'Wednesday Bill', 'Monday Tim', 'Friday Tim']),
            ),
        ).to.deep.equal([
            'Scheduled for Monday',
            'Scheduled for Wednesday',
            'Conflict on Monday!',
            'Scheduled for Friday',
            'Monday -> Peter',
            'Wednesday -> Bill',
            'Friday -> Tim',
        ]);
    });

    it('03. Address Book', () => {
        expect(
            captureLog(() =>
                addressBook([
                    'Tim:Doe Crossing',
                    'Bill:Nelson Place',
                    'Peter:Carlyle Ave',
                    'Bill:Ornery Rd',
                ]),
            ),
        ).to.deep.equal(['Bill -> Ornery Rd', 'Peter -> Carlyle Ave', 'Tim -> Doe Crossing']);
    });

    it('04. Storage', () => {
        expect(
            captureLog(() => storage(['tomatoes 10', 'coffee 5', 'olives 100', 'coffee 40'])),
        ).to.deep.equal(['tomatoes -> 10', 'coffee -> 45', 'olives -> 100']);
    });

    it('05. School Grades', () => {
        expect(
            captureLog(() => schoolGrades(['Lilly 4 6 6 5', 'Tim 5 6', 'Tammy 2 4 3', 'Tim 6 6'])),
        ).to.deep.equal(['Tammy: 2, 4, 3', 'Lilly: 4, 6, 6, 5', 'Tim: 5, 6, 6, 6']);
    });

    it('06. Word Occurrences', () => {
        expect(
            captureLog(() =>
                wordOccurrences([
                    'Here',
                    'is',
                    'the',
                    'first',
                    'sentence',
                    'Here',
                    'is',
                    'another',
                    'sentence',
                    'And',
                    'finally',
                    'the',
                    'third',
                    'sentence',
                ]),
            ),
        ).to.deep.equal([
            'sentence -> 3 times',
            'Here -> 2 times',
            'is -> 2 times',
            'the -> 2 times',
            'first -> 1 times',
            'another -> 1 times',
            'And -> 1 times',
            'finally -> 1 times',
            'third -> 1 times',
        ]);
    });

    it('07. Neighborhoods', () => {
        expect(
            captureLog(() =>
                neighborhoods([
                    'Abbey Street, Herald Street, Bright Mews',
                    'Bright Mews - Garry',
                    'Bright Mews - Andrea',
                    'Invalid Street - Tommy',
                    'Abbey Street - Billy',
                ]),
            ),
        ).to.deep.equal([
            'Bright Mews: 2',
            '--Garry',
            '--Andrea',
            'Abbey Street: 1',
            '--Billy',
            'Herald Street: 0',
        ]);
    });
});
