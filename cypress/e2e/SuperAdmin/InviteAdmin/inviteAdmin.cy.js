/// <reference types="cypress" />

import { inviteAdmin } from "../../../api/SuperAdmin/inviteAdmin.api";
import { inviteAdminData } from "../../../api/SuperAdmin/inviteAdmin.data";
import { superAdminLogin } from "../../../api/SuperAdmin/loginSuperAdmin.api";
import { adminSideErrorMessages } from "../../../message/ErrorMessages/AdminSideErrorMessages/errorMessages";
import { commonErrorMessages } from "../../../message/ErrorMessages/commonErrorMessages";
import { adminSideSuccessMessages } from "../../../message/SuccessMessages/AdminSiteSuccessMessages/successMessages";
import { commonSuccessMessages } from "../../../message/SuccessMessages/commonSuccessMessages";

let superAdminToken;

describe("Invite Admin", () => {

    describe("If the Super Admin is not logged in", () => {

        it("the system throws error message on trying to send invite", () => {
            inviteAdmin(inviteAdminData, "").then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message', commonErrorMessages.unauthorized);
                expect(response.body).to.have.property('success', false);
            })
        });

    });

    describe("If the Super Admin is logged in", () => {

        before(() => {
            superAdminLogin(Cypress.env('superAdminEmail'), Cypress.env('superAdminPassword')).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('message', `${commonSuccessMessages.successfulLogin}`);
                expect(response.body.data.admin.roles).to.have.length(1);
                expect(response.body.data.admin.roles[0]).to.have.property('role', 'super_admin');
                superAdminToken = response.body.data.bearerToken;
            });
        });

        it("invite can't be sent when the admin name is empty", () => {
            inviteAdmin({ ...inviteAdminData, name: "" }, superAdminToken).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `name${adminSideErrorMessages.emptyField}`);
            })
        });

        it("invite can't be sent when the admin email is empty", () => {
            inviteAdmin({ ...inviteAdminData, email: "" }, superAdminToken).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `${adminSideErrorMessages.invalidEmail}`);
            })
        });

        it("invite can't be sent when the admin role is empty", () => {
            inviteAdmin({ ...inviteAdminData, role: "" }, superAdminToken).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `${adminSideErrorMessages.invalidRole}`);
            })
        });

        it("invite can't be sent when the admin company name is empty", () => {
            inviteAdmin({ ...inviteAdminData, company_name: "" }, superAdminToken).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message', `company_name${adminSideErrorMessages.emptyField}`);
            })
        });

        it("invite will be sent when the admin data is correct", () => {
            inviteAdmin(inviteAdminData, superAdminToken).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('message', `${adminSideSuccessMessages.successfullyInviteSent}`);
            })
        });

    });

});