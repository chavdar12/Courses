function dungeonestDark([dungeon]) {
    let health = 100;
    let coins = 0;
    const rooms = dungeon.split('|');
    for (let i = 0; i < rooms.length; i++) {
        const [name, value] = rooms[i].split(' ');
        const amount = Number(value);
        if (name === 'potion') {
            const healed = Math.min(amount, 100 - health);
            health += healed;
            console.log(`You healed for ${healed} hp.`);
            console.log(`Current health: ${health} hp.`);
        } else if (name === 'chest') {
            coins += amount;
            console.log(`You found ${amount} coins.`);
        } else {
            health -= amount;
            if (health <= 0) {
                console.log(`You died! Killed by ${name}.`);
                console.log(`Best room: ${i + 1}`);
                return;
            }
            console.log(`You slayed ${name}.`);
        }
    }
    console.log("You've made it!");
    console.log(`Coins: ${coins}`);
    console.log(`Health: ${health}`);
}

module.exports = dungeonestDark;
