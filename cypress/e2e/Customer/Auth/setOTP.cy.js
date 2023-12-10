import { setOTPForRegistration } from "../../../api/Customer/handleCustomer.api";
import { setOTPPhoneNumber } from "../../../api/Customer/handleCustomer.data";
import { customerErrorMessages } from "../../../message/ErrorMessages/Customer/customerErrorMessages";

describe("Send OTP for Registration API Automation Testing", () => {

    it("Can't send otp to empty phone number", () => {
        setOTPForRegistration({...setOTPPhoneNumber, phoneNumber: ""}).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message', `${customerErrorMessages.invalidPhoneNumber}`);
            expect(response.body).to.have.property('success', false);
        });
    });

    it("Can't send otp to invalid phone number", () => {
        setOTPForRegistration({...setOTPPhoneNumber, phoneNumber: "9779812"}).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message', `${customerErrorMessages.invalidPhoneNumber}`);
            expect(response.body).to.have.property('success', false);
        });
    });

    it("Send otp to valid phone number", () => {
        setOTPForRegistration({...setOTPPhoneNumber}).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'OTP sent successfully');
            expect(response.body).to.have.property('success', true);
        });
    })

    it("Can't send otp to invalid phone number", () => {
        setOTPForRegistration({...setOTPPhoneNumber, phoneNumber: "9779806762451"}).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message', `${customerErrorMessages.invalidPhoneNumber}`);
            expect(response.body).to.have.property('success', false);
        });
    });

});