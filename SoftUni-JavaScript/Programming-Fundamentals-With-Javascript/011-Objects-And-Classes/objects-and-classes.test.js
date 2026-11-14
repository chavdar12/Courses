const { expect } = require('chai');
const { captureLog } = require('./test-helpers/console');

const personInfo = require('./01.personInfo');
const city = require('./02.city');
const convertToObject = require('./03.convertToObject');
const convertToJson = require('./04.convertToJson');
const cats = require('./05.cats');
const songs = require('./06.songs');

describe('Objects and Classes - Lab', () => {
    it('01. Person Info', () => {
        expect(personInfo('Peter', 'Pan', '20')).to.deep.equal({ firstName: 'Peter', lastName: 'Pan', age: '20' });
    });

    it('02. City', () => {
        expect(captureLog(() => city({ name: 'Sofia', area: 492, population: 1238438, country: 'Bulgaria', postCode: '1000' })))
            .to.deep.equal(['name -> Sofia', 'area -> 492', 'population -> 1238438', 'country -> Bulgaria', 'postCode -> 1000']);
    });

    it('03. Convert to Object', () => {
        expect(captureLog(() => convertToObject('{"name": "George", "age": 40, "town": "Sofia"}')))
            .to.deep.equal(['name: George', 'age: 40', 'town: Sofia']);
    });

    it('04. Convert to JSON', () => {
        expect(captureLog(() => convertToJson('George', 'Jones', 'Brown')))
            .to.deep.equal(['{"name":"George","lastName":"Jones","hairColor":"Brown"}']);
    });

    it('05. Cats', () => {
        expect(captureLog(() => cats(['Mellow 2', 'Tom 5']))).to.deep.equal(['Mellow, age 2 says Meow', 'Tom, age 5 says Meow']);
    });

    it('06. Songs', () => {
        expect(captureLog(() => songs([3, 'favourite_DownTown_3:14', 'favourite_Kiss_4:16', 'favourite_Smooth Criminal_4:01', 'favourite'])))
            .to.deep.equal(['DownTown', 'Kiss', 'Smooth Criminal']);
        expect(captureLog(() => songs([4, 'favourite_DownTown_3:14', 'listenLater_Andalouse_3:24', 'favourite_In To The Night_3:58',
            'favourite_Live It Up_3:48', 'listenLater']))).to.deep.equal(['Andalouse']);
        expect(captureLog(() => songs([2, 'like_Replay_3:15', 'ban_Photoshop_3:48', 'all']))).to.deep.equal(['Replay', 'Photoshop']);
    });
});
