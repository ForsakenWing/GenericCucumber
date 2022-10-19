import { readdirSync, readFileSync } from 'fs';
import { extname, join } from 'path';

const dirPath = 'test-data/';
const jsonsInDir = readdirSync(dirPath) .filter(file => extname(file) === '.json');
var testData = {};
jsonsInDir.forEach(file => {
    const fileData = readFileSync(join(dirPath, file));
    const json: JSON = JSON.parse(fileData.toString());
    testData[file.split('.')[0]] = json
});
export { testData };