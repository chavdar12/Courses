const POWERS = { J: 11, Q: 12, K: 13, A: 14 };
const TYPES = { S: 4, H: 3, D: 2, C: 1 };

function cardGame(entries) {
    const hands = new Map();
    for (const entry of entries) {
        const [name, cards] = entry.split(': ');
        const hand = hands.get(name) ?? new Set();
        cards.split(', ').forEach((card) => hand.add(card));
        hands.set(name, hand);
    }
    for (const [name, hand] of hands) {
        let value = 0;
        for (const card of hand) {
            const power = card.slice(0, -1);
            value += (POWERS[power] ?? Number(power)) * TYPES[card.at(-1)];
        }
        console.log(`${name}: ${value}`);
    }
}

module.exports = cardGame;
