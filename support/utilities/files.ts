import { readdirSync, readFileSync } from 'fs';
import { extname, join } from 'path';
import { config } from '../../config';

const testDataDir = config.testDataPath || 'test-data/';
const fixturesDir = config.fixturesPath || 'fixtures/';
const secretsDir = config.secretsPath || 'secrets/';
var testData = {};
function parseDataFromJsonFiles(dirPath) {
    const jsonsInDir = readdirSync(dirPath).filter(file => extname(file) === '.json');
    jsonsInDir.forEach(file => {
        const fileData = readFileSync(join(dirPath, file));
        const json: JSON = JSON.parse(fileData.toString());
        testData[file.split('.')[0]] = json;
    });
} 
parseDataFromJsonFiles(testDataDir);
parseDataFromJsonFiles(fixturesDir);
parseDataFromJsonFiles(secretsDir);
export { testData };