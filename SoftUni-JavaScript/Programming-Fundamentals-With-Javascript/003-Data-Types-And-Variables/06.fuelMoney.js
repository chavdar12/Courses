function fuelMoney(distance, passengers, dieselPrice) {
    const fuel = distance / 100 * 7 + passengers * 0.1;
    console.log(`Needed money for that trip is ${fuel * dieselPrice}lv.`);
}

module.exports = fuelMoney;
