function specialNumbers(n) {
    for (let i = 1; i <= n; i++) {
        const sum = [...String(i)].reduce((acc, digit) => acc + Number(digit), 0);
        console.log(`${i} -> ${[5, 7, 11].includes(sum) ? 'True' : 'False'}`);
    }
}

module.exports = specialNumbers;
