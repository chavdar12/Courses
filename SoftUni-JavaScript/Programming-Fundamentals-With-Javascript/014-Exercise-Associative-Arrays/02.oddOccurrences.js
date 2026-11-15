function oddOccurrences(sentence) {
    const counts = new Map();
    sentence
        .toLowerCase()
        .split(' ')
        .forEach((word) => counts.set(word, (counts.get(word) ?? 0) + 1));
    console.log(
        [...counts]
            .filter(([, count]) => count % 2 === 1)
            .map(([word]) => word)
            .join(' '),
    );
}

module.exports = oddOccurrences;
