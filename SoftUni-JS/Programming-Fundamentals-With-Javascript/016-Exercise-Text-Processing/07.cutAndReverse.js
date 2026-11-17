function cutAndReverse(text) {
    const reverse = (str) => [...str].reverse().join('');
    const half = text.length / 2;
    console.log(reverse(text.slice(0, half)));
    console.log(reverse(text.slice(half)));
}

module.exports = cutAndReverse;
