function amazingNumbers(number) {
    const sum = [...String(number)].reduce((acc, digit) => acc + Number(digit), 0);
    console.log(`${number} Amazing? ${String(sum).includes('9') ? 'True' : 'False'}`);
}

module.exports = amazingNumbers;
