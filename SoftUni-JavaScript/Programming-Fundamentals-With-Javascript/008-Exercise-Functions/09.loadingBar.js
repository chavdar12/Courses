function loadingBar(percent) {
    const filled = percent / 10;
    const bar = `[${'%'.repeat(filled)}${'.'.repeat(10 - filled)}]`;
    if (percent === 100) {
        console.log('100% Complete!');
        console.log(bar);
    } else {
        console.log(`${percent}% ${bar}`);
        console.log('Still loading...');
    }
}

module.exports = loadingBar;
