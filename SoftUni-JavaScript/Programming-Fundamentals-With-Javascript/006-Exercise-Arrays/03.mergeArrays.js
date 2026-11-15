function mergeArrays(first, second) {
    const merged = first.map((a, i) =>
        i % 2 === 0 ? Number(a) + Number(second[i]) : a + second[i],
    );
    console.log(merged.join(' - '));
}

module.exports = mergeArrays;
