const { expect } = require('chai');
const { captureLog } = require('./test-helpers/console');

const employees = require('./01.employees');
const towns = require('./02.towns');
const storeProvision = require('./03.storeProvision');
const movies = require('./04.movies');
const inventory = require('./05.inventory');
const makeADictionary = require('./06.makeADictionary');
const Vehicle = require('./07.vehicle');
const Storage = require('./08.storage');
const catalogue = require('./09.catalogue');
const systemsRegister = require('./10.systemsRegister');

describe('Objects and Classes - Exercise', () => {
    it('01. Employees', () => {
        expect(captureLog(() => employees(['Silas Butler', 'Adnaan Buckley', 'Juan Peterson', 'Brendan Villarreal']))).to.deep.equal([
            'Name: Silas Butler -- Personal Number: 12', 'Name: Adnaan Buckley -- Personal Number: 14',
            'Name: Juan Peterson -- Personal Number: 13', 'Name: Brendan Villarreal -- Personal Number: 18',
        ]);
    });

    it('02. Towns', () => {
        expect(captureLog(() => towns(['Sofia | 42.696552 | 23.32601', 'Beijing | 39.913818 | 116.363625']))).to.deep.equal([
            "{ town: 'Sofia', latitude: '42.70', longitude: '23.33' }",
            "{ town: 'Beijing', latitude: '39.91', longitude: '116.36' }",
        ]);
    });

    it('03. Store Provision', () => {
        expect(captureLog(() => storeProvision(
            ['Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'],
            ['Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30'],
        ))).to.deep.equal([
            'Chips -> 5', 'CocaCola -> 9', 'Bananas -> 44', 'Pasta -> 11', 'Beer -> 2', 'Flour -> 44', 'Oil -> 12', 'Tomatoes -> 70',
        ]);
    });

    it('04. Movies', () => {
        expect(captureLog(() => movies([
            'addMovie Fast and Furious', 'addMovie Godfather', 'Inception directedBy Christopher Nolan',
            'Godfather directedBy Francis Ford Coppola', 'Godfather onDate 29.07.2018', 'Fast and Furious onDate 30.07.2018',
            'Batman onDate 01.08.2018', 'Fast and Furious directedBy Rob Cohen',
        ]))).to.deep.equal([
            '{"name":"Fast and Furious","date":"30.07.2018","director":"Rob Cohen"}',
            '{"name":"Godfather","director":"Francis Ford Coppola","date":"29.07.2018"}',
        ]);
    });

    it('05. Inventory', () => {
        expect(captureLog(() => inventory([
            'Isacc / 25 / Apple, GravityGun', 'Derek / 12 / BarrelVest, DestructionSword', 'Hes / 1 / Desolator, Sentinel, Antara',
        ]))).to.deep.equal([
            'Hero: Hes', 'level => 1', 'items => Antara, Desolator, Sentinel',
            'Hero: Derek', 'level => 12', 'items => BarrelVest, DestructionSword',
            'Hero: Isacc', 'level => 25', 'items => Apple, GravityGun',
        ]);
    });

    it('06. Make a Dictionary', () => {
        expect(captureLog(() => makeADictionary([
            '{"Coffee":"A hot drink."}', '{"Bus":"A large motor vehicle."}', '{"Boiler":"A fuel-burning apparatus."}',
            '{"Coffee":"Black gold."}',
        ]))).to.deep.equal([
            'Term: Boiler => Definition: A fuel-burning apparatus.', 'Term: Bus => Definition: A large motor vehicle.',
            'Term: Coffee => Definition: Black gold.',
        ]);
    });

    it('07. Class Vehicle', () => {
        const vehicle = new Vehicle('a', 'b', { engine: 6, power: 100 }, 200);
        vehicle.drive(100);
        expect(vehicle.fuel).to.equal(100);
        expect(vehicle.parts.quality).to.equal(600);
    });

    it('08. Class Storage', () => {
        const storage = new Storage(50);
        storage.addProduct({ name: 'Cucamber', price: 1.5, quantity: 15 });
        storage.addProduct({ name: 'Tomato', price: 0.9, quantity: 25 });
        storage.addProduct({ name: 'Bread', price: 1.1, quantity: 8 });
        expect(storage.getProducts()).to.equal([
            '{"name":"Cucamber","price":1.5,"quantity":15}',
            '{"name":"Tomato","price":0.9,"quantity":25}',
            '{"name":"Bread","price":1.1,"quantity":8}',
        ].join('\n'));
        expect(storage.capacity).to.equal(2);
        expect(storage.totalCost).to.be.closeTo(53.8, 1e-9);
    });

    it('09. Catalogue', () => {
        expect(captureLog(() => catalogue(['Appricot : 20.4', 'Fridge : 1500', 'TV : 1499', 'Deodorant : 10', 'Boiler : 300',
            'Apple : 1.25', 'Anti-Bug Spray : 15', 'T-Shirt : 10']))).to.deep.equal([
            'A', '  Anti-Bug Spray: 15', '  Apple: 1.25', '  Appricot: 20.4', 'B', '  Boiler: 300', 'D', '  Deodorant: 10',
            'F', '  Fridge: 1500', 'T', '  T-Shirt: 10', '  TV: 1499',
        ]);
    });

    it('10. Systems Register', () => {
        expect(captureLog(() => systemsRegister([
            'SULS | Main Site | Home Page', 'SULS | Main Site | Login Page', 'SULS | Main Site | Register Page',
            'SULS | Judge Site | Login Page', 'SULS | Judge Site | Submittion Page', 'Lambda | CoreA | A23',
            'SULS | Digital Site | Login Page', 'Lambda | CoreB | B24', 'Lambda | CoreA | A24', 'Lambda | CoreA | A25',
            'Lambda | CoreC | C4', 'Indice | Session | Default Storage', 'Indice | Session | Default Security',
        ]))).to.deep.equal([
            'Lambda', '|||CoreA', '||||||A23', '||||||A24', '||||||A25', '|||CoreB', '||||||B24', '|||CoreC', '||||||C4',
            'SULS', '|||Main Site', '||||||Home Page', '||||||Login Page', '||||||Register Page', '|||Judge Site',
            '||||||Login Page', '||||||Submittion Page', '|||Digital Site', '||||||Login Page',
            'Indice', '|||Session', '||||||Default Storage', '||||||Default Security',
        ]);
    });
});
