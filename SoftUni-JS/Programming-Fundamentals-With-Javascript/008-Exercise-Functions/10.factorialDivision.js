function factorialDivision(a, b) {
    const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
    console.log((factorial(a) / factorial(b)).toFixed(2));
}

module.exports = factorialDivision;
