import { promises as fs, Dirent } from 'fs';
import * as path from 'path';

(async () => {
    const arg = process.argv[2];
    try {
        const dir = await fs.realpath(arg);
        const names = await getNames(dir, file => file.name.indexOf('.style.') >= 0);
        console.log(names);
    }
    catch (e) {
        console.error(e);
    }
})();

function getPath(arg: string) {
    if (arg) {
        if (path.isAbsolute(arg)) {
            return arg;
        } else {
            return path.join(process.cwd(), arg);
        }
    } else {
        return process.cwd();
    }
}

async function getNames(current: string, filter?: (file: Dirent) => boolean, names: string[] = []) {
    const files = await fs.readdir(current, {
        withFileTypes: true,
    });
    if (filter) {
        files.filter(file => file.isFile()).filter(filter).forEach(file => {
            names.push(path.join(current, file.name));
        });
    } else {
        files.filter(file => file.isFile()).forEach(file => {
            names.push(path.join(current, file.name));
        });
    }
    await Promise.all(files.filter(file => file.isDirectory()).map(async dir => {
        await getNames(path.join(current, dir.name), filter, names);
    }));
    return names;
}