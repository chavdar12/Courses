function evenAndOddSubtraction(arr) {
    console.log(arr.map(Number).reduce((diff, n) => (n % 2 === 0 ? diff + n : diff - n), 0));
}

module.exports = evenAndOddSubtraction;
