const { expect } = require('chai');
const { captureLog } = require('./test-helpers/console');

const train = require('./01.train');
const distinctArray = require('./02.distinctArray');
const houseParty = require('./03.houseParty');
const sorting = require('./04.sorting');
const sortByTwoCriteria = require('./05.sortByTwoCriteria');
const bombNumbers = require('./06.bombNumbers');
const searchForANumber = require('./07.searchForANumber');
const arrayManipulator = require('./08.arrayManipulator');
const gladiatorInventory = require('./09.gladiatorInventory');
const buildAWall = require('./10.buildAWall');

describe('Arrays Advanced - Exercise', () => {
    it('01. Train', () => {
        expect(
            captureLog(() =>
                train(['32 54 21 12 4 0 23', '75', 'Add 10', 'Add 0', '30', '10', '75']),
            ),
        ).to.deep.equal(['72 54 21 12 4 75 23 10 0']);
        expect(
            captureLog(() => train(['0 0 0 10 2 4', '10', 'Add 10', '10', '10', '10', '8', '6'])),
        ).to.deep.equal(['10 10 10 10 10 10 10']);
    });

    it('02. Distinct Array', () => {
        expect(captureLog(() => distinctArray([1, 2, 3, 4]))).to.deep.equal(['1 2 3 4']);
        expect(captureLog(() => distinctArray([7, 8, 9, 7, 2, 3, 4, 1, 2]))).to.deep.equal([
            '7 8 9 2 3 4 1',
        ]);
        expect(captureLog(() => distinctArray([20, 8, 12, 13, 4, 4, 8, 5]))).to.deep.equal([
            '20 8 12 13 4 5',
        ]);
    });

    it('03. House Party', () => {
        expect(
            captureLog(() =>
                houseParty([
                    'Allie is going!',
                    'George is going!',
                    'John is not going!',
                    'George is not going!',
                ]),
            ),
        ).to.deep.equal(['John is not in the list!', 'Allie']);
        expect(
            captureLog(() =>
                houseParty([
                    'Tom is going!',
                    'Annie is going!',
                    'Tom is going!',
                    'Garry is going!',
                    'Jerry is going!',
                ]),
            ),
        ).to.deep.equal(['Tom is already in the list!', 'Tom', 'Annie', 'Garry', 'Jerry']);
    });

    it('04. Sorting', () => {
        expect(captureLog(() => sorting([1, 21, 3, 52, 69, 63, 31, 2, 18, 94]))).to.deep.equal([
            '94 1 69 2 63 3 52 18 31 21',
        ]);
    });

    it('05. Sort an Array by 2 Criteria', () => {
        expect(captureLog(() => sortByTwoCriteria(['alpha', 'beta', 'gamma']))).to.deep.equal([
            'beta',
            'alpha',
            'gamma',
        ]);
        expect(
            captureLog(() => sortByTwoCriteria(['Isacc', 'Theodor', 'Jack', 'Harrison', 'George'])),
        ).to.deep.equal(['Jack', 'Isacc', 'George', 'Theodor', 'Harrison']);
    });

    it('06. Bomb Numbers', () => {
        expect(captureLog(() => bombNumbers([1, 2, 2, 4, 2, 2, 2, 9], [4, 2]))).to.deep.equal([
            '12',
        ]);
        expect(captureLog(() => bombNumbers([1, 4, 4, 2, 8, 9, 1], [9, 3]))).to.deep.equal(['5']);
        expect(captureLog(() => bombNumbers([1, 7, 7, 1, 2, 3], [7, 1]))).to.deep.equal(['6']);
        expect(captureLog(() => bombNumbers([1, 1, 2, 1, 1, 1, 2, 1, 1, 1], [2, 1]))).to.deep.equal(
            ['4'],
        );
    });

    it('07. Search for a Number', () => {
        expect(captureLog(() => searchForANumber([5, 2, 3, 4, 1, 6], [5, 2, 3]))).to.deep.equal([
            'Number 3 occurs 1 times.',
        ]);
    });

    it('08. Array Manipulator', () => {
        expect(
            captureLog(() =>
                arrayManipulator(
                    [1, 2, 4, 5, 6, 7],
                    ['add 1 8', 'contains 1', 'contains 3', 'print'],
                ),
            ),
        ).to.deep.equal(['0', '-1', '[ 1, 8, 2, 4, 5, 6, 7 ]']);
        expect(
            captureLog(() =>
                arrayManipulator(
                    [1, 2, 3, 4, 5],
                    ['addMany 5 9 8 7 6 5', 'contains 15', 'remove 3', 'shift 1', 'print'],
                ),
            ),
        ).to.deep.equal(['-1', '[ 2, 3, 5, 9, 8, 7, 6, 5, 1 ]']);
        expect(
            captureLog(() => arrayManipulator([1, 2, 4, 5, 6, 7, 8], ['sumPairs', 'print'])),
        ).to.deep.equal(['[ 3, 9, 13, 8 ]']);
    });

    it('09. Gladiator Inventory', () => {
        expect(
            captureLog(() =>
                gladiatorInventory([
                    'SWORD Shield Spear',
                    'Buy Bag',
                    'Trash Shield',
                    'Repair Spear',
                    'Upgrade SWORD-Steel',
                ]),
            ),
        ).to.deep.equal(['SWORD SWORD:Steel Bag Spear']);
        expect(
            captureLog(() =>
                gladiatorInventory([
                    'SWORD Shield Spear',
                    'Trash Bow',
                    'Repair Shield',
                    'Upgrade Helmet-V',
                ]),
            ),
        ).to.deep.equal(['SWORD Spear Shield']);
    });

    it('10. Build a Wall', () => {
        expect(captureLog(() => buildAWall([21, 25, 28]))).to.deep.equal([
            '585, 585, 390, 390, 390, 195, 195, 195, 195',
            '5928000 pesos',
        ]);
        expect(captureLog(() => buildAWall([17]))).to.deep.equal([
            new Array(13).fill(195).join(', '),
            '4816500 pesos',
        ]);
        expect(captureLog(() => buildAWall([17, 22, 17, 19, 17]))).to.deep.equal([
            '975, 975, 975, 975, 975, 975, 975, 975, 780, 780, 780, 585, 585',
            '21489000 pesos',
        ]);
    });
});
