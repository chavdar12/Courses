function gladiatorInventory([inventoryLine, ...commands]) {
    const inventory = inventoryLine.split(' ');
    for (const command of commands) {
        const [action, item] = command.split(' ');
        if (action === 'Buy') {
            if (!inventory.includes(item)) {
                inventory.push(item);
            }
        } else if (action === 'Trash' || action === 'Repair') {
            const index = inventory.indexOf(item);
            if (index !== -1) {
                inventory.splice(index, 1);
                if (action === 'Repair') {
                    inventory.push(item);
                }
            }
        } else if (action === 'Upgrade') {
            const [equipment, upgrade] = item.split('-');
            const index = inventory.indexOf(equipment);
            if (index !== -1) {
                inventory.splice(index + 1, 0, `${equipment}:${upgrade}`);
            }
        }
    }
    console.log(inventory.join(' '));
}

module.exports = gladiatorInventory;
