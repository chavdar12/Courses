function equalSums(arr) {
    const total = arr.reduce((a, b) => a + b, 0);
    let left = 0;
    for (let i = 0; i < arr.length; i++) {
        if (left === total - left - arr[i]) {
            console.log(i);
            return;
        }
        left += arr[i];
    }
    console.log('no');
}

module.exports = equalSums;
