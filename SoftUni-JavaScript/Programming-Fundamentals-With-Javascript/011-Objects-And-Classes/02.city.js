function city(info) {
    for (const [key, value] of Object.entries(info)) {
        console.log(`${key} -> ${value}`);
    }
}

module.exports = city;
