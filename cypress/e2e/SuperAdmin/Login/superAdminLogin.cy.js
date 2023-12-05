/// <reference types="cypress" />

import { superAdminLogin } from "../../../api/SuperAdmin/loginSuperAdmin.api";
import { commonErrorMessages } from "../../../message/ErrorMessages/commonErrorMessages";
import { commonSuccessMessages } from "../../../message/SuccessMessages/commonSuccessMessages";

describe("Super Admin Login", () => {

    it("Can't login with empty email", () => {
        superAdminLogin("", Cypress.env('superAdminPassword')).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message', `${commonErrorMessages.invalidEmail}`);
        });
    });

    it("Can't login with empty password", () => {
        superAdminLogin(Cypress.env('superAdminEmail'), "").then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message', `password ${commonErrorMessages.emptyField}.`);
        });
    });

    it("Can't login with invalid email", () => {
        superAdminLogin("superadmin", Cypress.env('superAdminPassword')).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message', `${commonErrorMessages.invalidEmail}`);
        });
    });

    it("Can't login with invalid password", () => {
        superAdminLogin(Cypress.env('superAdminEmail'), "1234567890").then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.have.property('message', `${commonErrorMessages.invalidPassword}`);
        });
    });

    it("Can login with valid credentials", () => {
        superAdminLogin(Cypress.env('superAdminEmail'), Cypress.env('superAdminPassword')).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', `${commonSuccessMessages.successfulLogin}`);
            expect(response.body.data.admin.roles).to.have.length(1);
            expect(response.body.data.admin.roles[0]).to.have.property('role', 'super_admin');
        });
    })

})