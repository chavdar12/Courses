function oddAndEvenSum(number) {
    let odd = 0;
    let even = 0;
    for (const digit of String(number)) {
        if (digit % 2 === 0) {
            even += Number(digit);
        } else {
            odd += Number(digit);
        }
    }
    console.log(`Odd sum = ${odd}, Even sum = ${even}`);
}

module.exports = oddAndEvenSum;
