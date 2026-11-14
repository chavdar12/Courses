const { expect } = require('chai');
const { captureLog } = require('./test-helpers/console');

const wordsTracker = require('./01.wordsTracker');
const oddOccurrences = require('./02.oddOccurrences');
const piccolo = require('./03.piccolo');
const partyTime = require('./04.partyTime');
const cardGame = require('./05.cardGame');
const travelTime = require('./06.travelTime');
const companyUsers = require('./07.companyUsers');
const aMinerTask = require('./08.aMinerTask');
const arenaTier = require('./09.arenaTier');
const legendaryFarming = require('./10.legendaryFarming');

describe('Associative Arrays - Exercise', () => {
    it('01. Words Tracker', () => {
        expect(captureLog(() => wordsTracker(['this sentence', 'In', 'this', 'sentence', 'you', 'have', 'to', 'count', 'the',
            'occurances', 'of', 'the', 'words', 'this', 'and', 'sentence', 'because', 'this', 'is', 'your', 'task'])))
            .to.deep.equal(['this - 3', 'sentence - 2']);
    });

    it('02. Odd Occurrences', () => {
        expect(captureLog(() => oddOccurrences('Java C# Php PHP Java PhP 3 C# 3 1 5 C#'))).to.deep.equal(['c# php 1 5']);
    });

    it('03. Piccolo', () => {
        expect(captureLog(() => piccolo(['IN, CA2844AA', 'IN, CA1234TA', 'OUT, CA2844AA', 'IN, CA9999TT', 'IN, CA2866HI',
            'OUT, CA1234TA', 'IN, CA2844AA', 'OUT, CA2866HI', 'IN, CA9876HH', 'IN, CA2822UU'])))
            .to.deep.equal(['CA2822UU', 'CA2844AA', 'CA9876HH', 'CA9999TT']);
        expect(captureLog(() => piccolo(['IN, CA2844AA', 'IN, CA1234TA', 'OUT, CA2844AA', 'OUT, CA1234TA'])))
            .to.deep.equal(['Parking Lot is Empty']);
    });

    it('04. Party Time', () => {
        expect(captureLog(() => partyTime(['7IK9Yo0h', '9NoBUajQ', 'Ce8vwPmE', 'SVQXQCbc', 'tSzE5t0p', 'PARTY', '9NoBUajQ',
            'Ce8vwPmE', 'SVQXQCbc']))).to.deep.equal(['2', '7IK9Yo0h', 'tSzE5t0p']);
        expect(captureLog(() => partyTime(['m8rfQBvl', 'fc1oZCE0', 'UgffRkOn', '7ugX7bm0', '9CQBGUeJ', '2FQZT3uC', 'dziNz78I',
            'mdSGyQCJ', 'LjcVpmDL', 'fPXNHpm1', 'HTTbwRmM', 'B5yTkMQi', '8N0FThqG', 'xys2FYzn', 'MDzcM9ZK', 'PARTY', '2FQZT3uC',
            'dziNz78I', 'mdSGyQCJ', 'LjcVpmDL', 'fPXNHpm1', 'HTTbwRmM', 'B5yTkMQi', '8N0FThqG', 'm8rfQBvl', 'fc1oZCE0',
            'UgffRkOn', '7ugX7bm0', '9CQBGUeJ']))).to.deep.equal(['2', 'xys2FYzn', 'MDzcM9ZK']);
        expect(captureLog(() => partyTime(['abc', '1vip', 'PARTY']))).to.deep.equal(['2', '1vip', 'abc']);
    });

    it('05. Card Game', () => {
        expect(captureLog(() => cardGame(['Peter: 2C, 4H, 9H, AS, QS', 'Tomas: 3H, 10S, JC, KD, 5S, 10S', 'Andrea: QH, QC, QS, QD',
            'Tomas: 6H, 7S, KC, KD, 5S, 10C', 'Andrea: QH, QC, JS, JD, JC', 'Peter: JD, JD, JD, JD, JD, JD'])))
            .to.deep.equal(['Peter: 167', 'Tomas: 175', 'Andrea: 197']);
    });

    it('06. Travel Time', () => {
        expect(captureLog(() => travelTime(['Bulgaria > Sofia > 500', 'Bulgaria > Sopot > 800', 'France > Paris > 2000',
            'Albania > Tirana > 1000', 'Bulgaria > Sofia > 200']))).to.deep.equal([
            'Albania -> Tirana -> 1000', 'Bulgaria -> Sofia -> 200 Sopot -> 800', 'France -> Paris -> 2000',
        ]);
    });

    it('07. Company Users', () => {
        expect(captureLog(() => companyUsers(['SoftUni -> AA12345', 'SoftUni -> BB12345', 'Microsoft -> CC12345', 'HP -> BB12345'])))
            .to.deep.equal(['HP', '-- BB12345', 'Microsoft', '-- CC12345', 'SoftUni', '-- AA12345', '-- BB12345']);
        expect(captureLog(() => companyUsers(['SoftUni -> AA12345', 'SoftUni -> CC12344', 'Lenovo -> XX23456',
            'SoftUni -> AA12345', 'Movement -> DD11111']))).to.deep.equal([
            'Lenovo', '-- XX23456', 'Movement', '-- DD11111', 'SoftUni', '-- AA12345', '-- CC12344',
        ]);
    });

    it('08. A Miner Task', () => {
        expect(captureLog(() => aMinerTask(['Gold', '155', 'Silver', '10', 'Copper', '17'])))
            .to.deep.equal(['Gold -> 155', 'Silver -> 10', 'Copper -> 17']);
        expect(captureLog(() => aMinerTask(['gold', '155', 'silver', '10', 'copper', '17', 'gold', '15'])))
            .to.deep.equal(['gold -> 170', 'silver -> 10', 'copper -> 17']);
    });

    it('09. Arena Tier', () => {
        expect(captureLog(() => arenaTier(['Peter -> BattleCry -> 400', 'Alex -> PowerPunch -> 300', 'Stefan -> Duck -> 200',
            'Stefan -> Tiger -> 250', 'Ave Cesar']))).to.deep.equal([
            'Stefan: 450 skill', '- Tiger <!> 250', '- Duck <!> 200', 'Peter: 400 skill', '- BattleCry <!> 400',
            'Alex: 300 skill', '- PowerPunch <!> 300',
        ]);
        expect(captureLog(() => arenaTier(['Pesho -> Duck -> 400', 'Julius -> Shield -> 150', 'Gladius -> Heal -> 200',
            'Gladius -> Support -> 250', 'Gladius -> Shield -> 250', 'Pesho vs Gladius', 'Gladius vs Julius',
            'Gladius vs Maximilian', 'Ave Cesar']))).to.deep.equal([
            'Gladius: 700 skill', '- Shield <!> 250', '- Support <!> 250', '- Heal <!> 200', 'Pesho: 400 skill', '- Duck <!> 400',
        ]);
    });

    it('10. Legendary Farming', () => {
        expect(captureLog(() => legendaryFarming('3 Motes 5 stones 5 Shards 6 leathers 255 fragments 7 Shards'))).to.deep.equal([
            'Valanyr obtained!', 'fragments: 5', 'shards: 5', 'motes: 3', 'leathers: 6', 'stones: 5',
        ]);
        expect(captureLog(() => legendaryFarming('123 silver 6 shards 8 shards 5 motes 9 fangs 75 motes 103 MOTES 8 Shards 86 Motes 7 stones 19 silver')))
            .to.deep.equal(['Dragonwrath obtained!', 'shards: 22', 'motes: 19', 'fragments: 0', 'fangs: 9', 'silver: 123']);
    });
});
