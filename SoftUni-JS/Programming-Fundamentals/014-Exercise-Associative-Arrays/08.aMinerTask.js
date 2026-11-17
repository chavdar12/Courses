function aMinerTask(input) {
    const resources = new Map();
    for (let i = 0; i < input.length; i += 2) {
        resources.set(input[i], (resources.get(input[i]) ?? 0) + Number(input[i + 1]));
    }
    for (const [resource, quantity] of resources) {
        console.log(`${resource} -> ${quantity}`);
    }
}

module.exports = aMinerTask;
