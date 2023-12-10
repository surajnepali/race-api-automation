import { register, setOTPForRegistration } from "../../../api/Customer/handleCustomer.api";
import { registerData, setOTPPhoneNumber } from "../../../api/Customer/handleCustomer.data";
import { customerErrorMessages } from "../../../message/ErrorMessages/Customer/customerErrorMessages";
import { customerSuccessMessages } from "../../../message/SuccessMessages/CustomerSuccessMessages/customerSuccessMessages";

let registerPhoneNumber, registerOTP;

describe("Send OTP for Registration API Automation Testing", () => {

    describe("the system sends OTP to the customer's phone numeber", () => {

        it("Send otp to valid phone number", () => {
            registerPhoneNumber = setOTPPhoneNumber.phoneNumber;
            setOTPForRegistration({...setOTPPhoneNumber}).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('message', 'OTP sent successfully');
                expect(response.body).to.have.property('success', true);
                registerOTP = response.body.data.otp;
            });
        });

    });

    describe("Fill the form and register the customer", () => {

        it("Can't register with empty phone number", () => {
            register({...registerData, phoneNumber: "", otp: registerOTP}).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `${customerErrorMessages.invalidPhoneNumber}`);
                expect(response.body).to.have.property('success', false);
            });
        });

        it("Can't register with different phone number", () => {
            register({...registerData, phoneNumber: "9779806760000", otp: registerOTP}).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `${customerErrorMessages.invalidData}`);
                expect(response.body).to.have.property('success', false);
            });
        });

        it("Can't register with empty first name", () => {
            register({...registerData, phoneNumber: registerPhoneNumber, firstName: "", otp: registerOTP}).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `firstName${customerErrorMessages.invalidRange}`);
                expect(response.body).to.have.property('success', false);
            });
        })

        it("Can't register with invalid first name", () => {
            register({...registerData, phoneNumber: registerPhoneNumber, firstName: "a", otp: registerOTP}).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `firstName${customerErrorMessages.invalidRange}`);
                expect(response.body).to.have.property('success', false);
            });
        });

        it("Can't register with empty last name", () => {
            register({...registerData, phoneNumber: registerPhoneNumber, lastName: "", otp: registerOTP}).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `lastName${customerErrorMessages.invalidRange}`);
                expect(response.body).to.have.property('success', false);
            });
        });

        it("Can't register with invalid last name", () => {
            register({...registerData, phoneNumber: registerPhoneNumber, lastName: "a", otp: registerOTP}).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `lastName${customerErrorMessages.invalidRange}`);
                expect(response.body).to.have.property('success', false);
            });
        })

        it("Can't register with empty otp", () => {
            register({...registerData, phoneNumber: registerPhoneNumber, otp: ""}).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `${customerErrorMessages.invalidOTP}`);
                expect(response.body).to.have.property('success', false);
            });
        });

        it("Can't register with alphabetical otp", () => {
            register({...registerData, phoneNumber: registerPhoneNumber, otp: "abcdef"}).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `${customerErrorMessages.invalidData}`);
                expect(response.body).to.have.property('success', false);
            });
        });

        it("Can't register with less than 6 digits otp", () => {
            register({...registerData, phoneNumber: registerPhoneNumber, otp: "12345"}).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `${customerErrorMessages.invalidOTP}`);
                expect(response.body).to.have.property('success', false);
            })
        })

        it("Can't register with more than 6 digits otp", () => {
            register({...registerData, phoneNumber: registerPhoneNumber, otp: "1234567"}).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `${customerErrorMessages.invalidOTP}`);
                expect(response.body).to.have.property('success', false);
            })
        })

        it("Can't register with less than 5 digits password", () => {
            register({...registerData, phoneNumber: registerPhoneNumber, otp: registerOTP, password: "1234"}).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `${customerErrorMessages.invalidPassword}`);
                expect(response.body).to.have.property('success', false);
            })
        });

        it("Can register with valid data and otp", () => {
            register({...registerData, phoneNumber: registerPhoneNumber, otp: registerOTP}).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('message', customerSuccessMessages.successfulRegistration);
                expect(response.body).to.have.property('success', true);
            })
        });

    });

});