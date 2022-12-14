import { ICustomWorld } from '../../src/support/custom_world';
import { evaluateParameters } from '../../src/helpers/evaluateParameters';
import log from '../../src/logging';
import { sleep } from '../../src/helpers/common';
import { isJSON } from '../../src/helpers/json';
import { readFixture } from '../../src/helpers/files';
import { set } from 'lodash';
import stringMath from 'string-math';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export async function iWaitSeconds(seconds: number) {
  log.info(`Wait for ${seconds} seconds`);
  await sleep(seconds * 1000);
}

export async function iWaitMinutes(minutes: number) {
  log.info(`Wait for ${minutes} minutes`);
  await sleep(minutes * 60000);
}

export async function iWaitMilliseconds(milliseconds: number) {
  log.info(`Wait for ${milliseconds} milliseconds`);
  await sleep(milliseconds);
}

export function iStoreAs(customWorld: ICustomWorld, value: string, key: string) {
  const obj = customWorld.testObject;
  value = evaluateParameters(obj, value);
  key = evaluateParameters(obj, key);

  if (isJSON(value)) {
    // INFO: For better saving objects I recommend to use with single quotes:
    // When I store '{\"payload\":{\"id\":\"HBNH989\",\"availableBalance\":100}}' as 'detail'
    // More in projects/qa-automation-skynet/features/generic.feature

    value = JSON.parse(value);
    return set(obj, key, value);
  }

  return set(obj, key, value);
}

export function iCalculateAndStoreAs(customWorld: ICustomWorld, evaluationStatement: string, key: string) {
  const obj = customWorld.testObject;
  evaluationStatement = evaluateParameters(obj, evaluationStatement);
  key = evaluateParameters(obj, key);

  const result = stringMath(evaluationStatement);
  return set(obj, key, result);
}

export function importFixtureFile(customWorld: ICustomWorld, filePath: string, key: string) {
  const fixtureFile = readFixture(filePath);
  iStoreAs(customWorld, fixtureFile, key);
}
