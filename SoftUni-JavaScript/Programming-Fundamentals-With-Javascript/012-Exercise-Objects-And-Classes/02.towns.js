function towns(rows) {
    for (const row of rows) {
        const [town, latitude, longitude] = row.split(' | ');
        console.log({ town, latitude: Number(latitude).toFixed(2), longitude: Number(longitude).toFixed(2) });
    }
}

module.exports = towns;
