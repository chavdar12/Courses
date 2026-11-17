function searchForANumber(numbers, [take, remove, search]) {
    const count = numbers
        .slice(0, take)
        .slice(remove)
        .filter((n) => n === search).length;
    console.log(`Number ${search} occurs ${count} times.`);
}

module.exports = searchForANumber;
