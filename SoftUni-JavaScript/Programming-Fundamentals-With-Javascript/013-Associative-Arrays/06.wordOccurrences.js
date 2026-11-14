function wordOccurrences(words) {
    const counts = new Map();
    words.forEach((word) => counts.set(word, (counts.get(word) ?? 0) + 1));
    [...counts]
        .sort(([, a], [, b]) => b - a)
        .forEach(([word, count]) => console.log(`${word} -> ${count} times`));
}

module.exports = wordOccurrences;
