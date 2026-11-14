function equalArrays(first, second) {
    const index = first.findIndex((value, i) => value !== second[i]);
    if (index === -1) {
        console.log(`Arrays are identical. Sum: ${first.reduce((sum, n) => sum + Number(n), 0)}`);
    } else {
        console.log(`Arrays are not identical. Found difference at ${index} index`);
    }
}

module.exports = equalArrays;
