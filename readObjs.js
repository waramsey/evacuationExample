import fs from 'fs';

readObjs();

export function readObjs() {
    let files = fs.readdirSync('./objs/').filter(str => str.endsWith('.obj'));

    fs.writeFileSync(`./objs/objectsList.txt`, files.toString());
}