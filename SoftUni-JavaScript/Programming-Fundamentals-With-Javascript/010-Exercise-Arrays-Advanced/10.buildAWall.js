function buildAWall(sections) {
    const heights = sections.map(Number);
    const daily = [];
    while (heights.some((h) => h < 30)) {
        let crews = 0;
        heights.forEach((h, i) => {
            if (h < 30) {
                heights[i]++;
                crews++;
            }
        });
        daily.push(crews * 195);
    }
    console.log(daily.join(', '));
    console.log(`${daily.reduce((a, b) => a + b, 0) * 1900} pesos`);
}

module.exports = buildAWall;
