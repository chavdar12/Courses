function sorting(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const result = [];
    while (sorted.length) {
        result.push(sorted.pop());
        if (sorted.length) {
            result.push(sorted.shift());
        }
    }
    console.log(result.join(' '));
}

module.exports = sorting;
