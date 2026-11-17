function reverseArrayOfStrings(arr) {
    // The task asks for an in-place swap rather than reverse().
    for (let i = 0; i < arr.length / 2; i++) {
        const j = arr.length - 1 - i;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    console.log(arr.join(' '));
}

module.exports = reverseArrayOfStrings;
