function makeADictionary(jsonLines) {
    const dictionary = Object.assign({}, ...jsonLines.map((line) => JSON.parse(line)));
    Object.keys(dictionary)
        .sort((a, b) => a.localeCompare(b))
        .forEach((term) => console.log(`Term: ${term} => Definition: ${dictionary[term]}`));
}

module.exports = makeADictionary;
