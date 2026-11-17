function wordsTracker([searched, ...words]) {
    const counts = new Map(searched.split(' ').map((word) => [word, 0]));
    words
        .filter((word) => counts.has(word))
        .forEach((word) => counts.set(word, counts.get(word) + 1));
    [...counts]
        .sort(([, a], [, b]) => b - a)
        .forEach(([word, count]) => console.log(`${word} - ${count}`));
}

module.exports = wordsTracker;
