function partyTime(input) {
    const partyIndex = input.indexOf('PARTY');
    const missing = input.slice(0, partyIndex);
    for (const guest of input.slice(partyIndex + 1)) {
        const index = missing.indexOf(guest);
        if (index !== -1) {
            missing.splice(index, 1);
        }
    }
    const isVip = (guest) => /^\d/.test(guest);
    console.log(missing.length);
    [...missing.filter(isVip), ...missing.filter((guest) => !isVip(guest))].forEach((guest) => console.log(guest));
}

module.exports = partyTime;
