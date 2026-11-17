import { readFile, writeFile } from 'node:fs/promises';
import config from '../config/config.js';

const URL_PATTERN = /^https?:\/\/.+/;

export default class Cube {
    constructor({ name, description, imageUrl, difficultyLevel }) {
        this.name = name?.trim();
        this.description = description?.trim();
        this.imageUrl = imageUrl?.trim();
        this.difficultyLevel = Number(difficultyLevel);
    }

    /** Returns the first problem with the cube, or null when it is valid. */
    validate() {
        if (!this.name || !this.description) {
            return 'Name and description are required.';
        }
        if (!URL_PATTERN.test(this.imageUrl)) {
            return 'Image URL must start with http:// or https://.';
        }
        if (
            !Number.isInteger(this.difficultyLevel) ||
            this.difficultyLevel < 1 ||
            this.difficultyLevel > 6
        ) {
            return 'Difficulty level must be between 1 and 6.';
        }
        return null;
    }

    async save() {
        const cubes = await Cube.getAll();
        this.id = Math.max(0, ...cubes.map((c) => c.id)) + 1;
        await writeFile(config.dbFile, JSON.stringify([...cubes, this], null, 4));
        return this;
    }

    static async getAll({ search = '', from, to } = {}) {
        const cubes = JSON.parse(await readFile(config.dbFile, 'utf8'));
        const min = Number(from) || 1;
        const max = Number(to) || 6;
        return cubes.filter(
            (c) =>
                c.name.toLowerCase().includes(search.toLowerCase()) &&
                c.difficultyLevel >= min &&
                c.difficultyLevel <= max,
        );
    }

    static async getById(id) {
        return (await Cube.getAll()).find((c) => c.id === Number(id));
    }
}
