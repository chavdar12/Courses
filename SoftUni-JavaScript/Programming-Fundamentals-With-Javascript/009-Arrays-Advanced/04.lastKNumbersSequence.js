function lastKNumbersSequence(n, k) {
    const sequence = [1];
    while (sequence.length < n) {
        sequence.push(sequence.slice(-k).reduce((a, b) => a + b, 0));
    }
    console.log(sequence.join(' '));
}

module.exports = lastKNumbersSequence;
