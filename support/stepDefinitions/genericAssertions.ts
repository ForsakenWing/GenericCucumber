import { ICustomWorld } from '../../src/support/custom_world';
import { compareTwoStrings, compareTwoNumbers, stringContainsString } from '../functions/genericAssertions';
import { Then } from '@cucumber/cucumber';

Then('The string {string} will be equal to the string {string}', function (this: ICustomWorld, valueA: string, valueB: string) {
  return compareTwoStrings(this, valueA, valueB);
});

Then('The number {string} will be equal to the number {string}', function (this: ICustomWorld, valueA: string, valueB: string) {
  return compareTwoNumbers(this, valueA, valueB);
});

Then('The string {string} will contain the string {string}', function (this: ICustomWorld, valueA: string, valueB: string) {
  return stringContainsString(this, valueA, valueB);
});
