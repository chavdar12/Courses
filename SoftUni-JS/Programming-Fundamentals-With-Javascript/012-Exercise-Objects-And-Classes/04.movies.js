function movies(commands) {
    const list = [];
    const find = (name) => list.find((movie) => movie.name === name);
    for (const command of commands) {
        if (command.startsWith('addMovie ')) {
            list.push({ name: command.slice('addMovie '.length) });
        } else if (command.includes(' directedBy ')) {
            const [name, director] = command.split(' directedBy ');
            const movie = find(name);
            if (movie) {
                movie.director = director;
            }
        } else if (command.includes(' onDate ')) {
            const [name, date] = command.split(' onDate ');
            const movie = find(name);
            if (movie) {
                movie.date = date;
            }
        }
    }
    list.filter((movie) => movie.name && movie.director && movie.date).forEach((movie) =>
        console.log(JSON.stringify(movie)),
    );
}

module.exports = movies;
