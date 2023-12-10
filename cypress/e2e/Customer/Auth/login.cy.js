import { login, register, setOTPForRegistration } from "../../../api/Customer/handleCustomer.api";
import { registerData, setOTPPhoneNumber, loginCredentials } from "../../../api/Customer/handleCustomer.data";
import { customerErrorMessages } from "../../../message/ErrorMessages/Customer/customerErrorMessages";
import { customerSuccessMessages } from "../../../message/SuccessMessages/CustomerSuccessMessages/customerSuccessMessages";

let registerPhoneNumber, registerOTP;

describe("Login API Automation Testing", () => {

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

        it("Can register with valid data and otp", () => {
            register({...registerData, phoneNumber: registerPhoneNumber, otp: registerOTP}).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('message', customerSuccessMessages.successfulRegistration);
                expect(response.body).to.have.property('success', true);
            })
        });

    });

    describe("Fill the form and login the customer", () => {
        
        it("Can't login with empty phone number", () => {
            login({...loginCredentials, phoneNumber: ""}).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `${customerErrorMessages.invalidPhoneNumber}`);
                expect(response.body).to.have.property('success', false);
            });
        });

        it("Can't login with different phone number", () => {
            login({...loginCredentials, phoneNumber: "9779806760000"}).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `${customerErrorMessages.userNotFound}`);
                expect(response.body).to.have.property('success', false);
            })
        })

        it("Can't login with empty password", () => {
            login({...loginCredentials, phoneNumber: registerPhoneNumber, password: ""}).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `${customerErrorMessages.invalidPassword}`);
                expect(response.body).to.have.property('success', false);
            })
        })

        it("Can't login with password less than 5 characters", () => {
            login({...loginCredentials, phoneNumber: registerPhoneNumber, password: "1234"}).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `${customerErrorMessages.invalidPassword}`);
                expect(response.body).to.have.property('success', false);
            })
        })

        it("Can login with valid credentials", () => {
            login({...loginCredentials, phoneNumber: registerPhoneNumber}).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('message', customerSuccessMessages.successfulLogin);
                expect(response.body).to.have.property('success', true);
            })
        })

    })

});