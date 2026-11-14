function triplesOfLatinLetters(n) {
    const letters = Array.from({ length: n }, (_, i) => String.fromCharCode(97 + i));
    for (const a of letters) {
        for (const b of letters) {
            for (const c of letters) {
                console.log(a + b + c);
            }
        }
    }
}

module.exports = triplesOfLatinLetters;
