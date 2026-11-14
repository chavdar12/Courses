function palindromeIntegers(numbers) {
    const isPalindrome = (n) => String(n) === [...String(n)].reverse().join('');
    numbers.forEach((n) => console.log(isPalindrome(n)));
}

module.exports = palindromeIntegers;
