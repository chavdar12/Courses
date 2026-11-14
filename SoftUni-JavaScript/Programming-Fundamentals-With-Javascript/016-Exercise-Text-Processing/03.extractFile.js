function extractFile(path) {
    const file = path.slice(path.lastIndexOf('\\') + 1);
    const dot = file.lastIndexOf('.');
    console.log(`File name: ${file.slice(0, dot)}`);
    console.log(`File extension: ${file.slice(dot + 1)}`);
}

module.exports = extractFile;
