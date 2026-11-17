function nxnMatrix(n) {
    const row = new Array(n).fill(n).join(' ');
    for (let i = 0; i < n; i++) {
        console.log(row);
    }
}

module.exports = nxnMatrix;
