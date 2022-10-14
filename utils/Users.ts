type PhoneNumber = string /* To be accepted in a  sign up form it should have length=10 e.g .
                             1234567890
                             0987654321
                             3456781029 
                          */
type Password = string /* To be accepted in sign up form it should contain:
                          One special character
                          One capital letter
                          One lowercase letter
                          One number 
                        */
enum Occupation {
    doctor = 'Doctor',
    student = 'Student',
    engineer = 'Engineer',
    scientist = 'Scientist'
};

enum Gender {
    male = 'Male',
    female = 'Female'
};

export { Gender, Occupation, Password, PhoneNumber }