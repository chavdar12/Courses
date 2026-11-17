function convertToObject(json) {
    for (const [key, value] of Object.entries(JSON.parse(json))) {
        console.log(`${key}: ${value}`);
    }
}

module.exports = convertToObject;
