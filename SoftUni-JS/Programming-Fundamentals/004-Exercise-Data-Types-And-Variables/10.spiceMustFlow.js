function spiceMustFlow(startingYield) {
    let yieldPerDay = startingYield;
    let days = 0;
    let spice = 0;
    while (yieldPerDay >= 100) {
        spice += yieldPerDay - 26;
        yieldPerDay -= 10;
        days++;
    }
    // Workers eat once more after the mine is exhausted, but never more than is stored.
    spice = Math.max(0, spice - 26);
    console.log(days);
    console.log(spice);
}

module.exports = spiceMustFlow;
