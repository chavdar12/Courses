class Song {
    constructor(typeList, name, time) {
        this.typeList = typeList;
        this.name = name;
        this.time = time;
    }
}

function songs([count, ...rest]) {
    const list = rest.slice(0, count).map((line) => new Song(...line.split('_')));
    const wanted = rest[count];
    list.filter((song) => wanted === 'all' || song.typeList === wanted).forEach((song) =>
        console.log(song.name),
    );
}

module.exports = songs;
