function maxSequenceOfEqualElements(arr) {
    let best = [];
    let current = [];
    for (const n of arr) {
        current = current[0] === n ? [...current, n] : [n];
        if (current.length > best.length) {
            best = current;
        }
    }
    console.log(best.join(' '));
}

module.exports = maxSequenceOfEqualElements;
