function signCheck(numOne, numTwo, numThree) {
    const negatives = [numOne, numTwo, numThree].filter((n) => n < 0).length;
    console.log(negatives % 2 === 1 ? 'Negative' : 'Positive');
}

module.exports = signCheck;
