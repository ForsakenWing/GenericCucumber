import { faker } from '@faker-js/faker';

const _ = undefined

export class User {
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    password: string;
    passwordConfirmation: string;
    constructor(
        firstname?: string,
        lastname?: string,
        email?: string,
        phonenumber?: string,
        password?: string,
    ) {
        this.firstname = firstname ?? faker.name.firstName();
        this.lastname = lastname ?? faker.name.lastName();
        this.email = email ?? faker.internet.email();
        this.phonenumber = phonenumber ?? faker.phone.number('#'.repeat(10));
        this.password = password ?? faker.internet.password(_, _, _, "S@1s");
        this.passwordConfirmation = this.password
    }
}
