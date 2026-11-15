const {
    sum,
    isEven,
    factorial,
    isPalindrome,
    fibonacci,
    nthPrime,
    isPrime,
    pascalsTriangle,
    isPerfectSquare,
} = require('../functions.js');

describe('sum', () => {
    it('adds positive, negative and decimal numbers', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(-2, -3)).toBe(-5);
        expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
    });
});

describe('isEven', () => {
    it('is true for even numbers', () => {
        [0, 2, -4, 100].forEach((n) => expect(isEven(n)).toBeTrue());
    });

    it('is false for odd numbers', () => {
        [1, -3, 99].forEach((n) => expect(isEven(n)).toBeFalse());
    });
});

describe('factorial', () => {
    it('returns 1 for 0, 1 and negatives', () => {
        [0, 1, -5].forEach((n) => expect(factorial(n)).toBe(1));
    });

    it('calculates n!', () => {
        expect(factorial(5)).toBe(120);
        expect(factorial(10)).toBe(3628800);
    });
});

describe('isPalindrome', () => {
    it('ignores case, spaces and punctuation', () => {
        expect(isPalindrome('racecar')).toBeTrue();
        expect(isPalindrome('A man, a plan, a canal: Panama')).toBeTrue();
    });

    it('is false for non-palindromes and empty string', () => {
        expect(isPalindrome('hello')).toBeFalse();
        expect(isPalindrome('')).toBeFalse();
    });
});

describe('fibonacci', () => {
    it('returns the first n numbers', () => {
        expect(fibonacci(0)).toEqual([]);
        expect(fibonacci(1)).toEqual([0]);
        expect(fibonacci(7)).toEqual([0, 1, 1, 2, 3, 5, 8]);
    });
});

describe('primes', () => {
    it('isPrime recognises primes and non-primes', () => {
        [2, 3, 5, 29, 97].forEach((n) => expect(isPrime(n)).toBeTrue());
        [-7, 0, 1, 9, 25, 91].forEach((n) => expect(isPrime(n)).toBeFalse());
    });

    it('nthPrime returns the n-th prime', () => {
        expect(nthPrime(1)).toBe(2);
        expect(nthPrime(5)).toBe(11);
        expect(nthPrime(11)).toBe(31);
    });
});

describe('pascalsTriangle', () => {
    it('builds the rows', () => {
        expect(pascalsTriangle(0)).toEqual([]);
        expect(pascalsTriangle(5)).toEqual([[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]);
    });
});

describe('isPerfectSquare', () => {
    it('is true only for perfect squares', () => {
        [0, 1, 16, 144].forEach((n) => expect(isPerfectSquare(n)).toBeTrue());
        [2, 15, 50].forEach((n) => expect(isPerfectSquare(n)).toBeFalse());
    });
});
