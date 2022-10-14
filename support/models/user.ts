
import { faker } from '@faker-js/faker';
import sample from 'underscore/modules/sample.js';
import { PhoneNumber, Occupation, Gender, Password } from '../../utils/Users';

const _ = undefined

export class User {
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: PhoneNumber;
    occupation: Occupation;
    gender: Gender;
    password: Password;
    passwordConfirmation: string;
    constructor(
        firstname?: string,
        lastname?: string,
        email?: string,
        phonenumber?: PhoneNumber,
        occupation?: string,
        gender?: string,
        password?: Password,
    ) {
        this.firstname = firstname ?? faker.name.firstName();
        this.lastname = lastname ?? faker.name.lastName();
        this.email = email ?? faker.internet.email();
        this.phonenumber = phonenumber ?? faker.phone.number('#'.repeat(10));
        this.occupation = occupation ?? sample(Object.values(Occupation));
        this.gender = gender ?? sample(Object.values(Gender));
        this.password = password ?? faker.internet.password(_, _, _, "S@1s");
        this.passwordConfirmation = this.password
    }
}
