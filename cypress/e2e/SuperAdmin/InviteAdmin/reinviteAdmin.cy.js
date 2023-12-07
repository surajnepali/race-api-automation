import { inviteAdmin } from "../../../api/SuperAdmin/inviteAdmin.api";
import { inviteAdminData } from "../../../api/SuperAdmin/inviteAdmin.data";
import { superAdminLogin } from "../../../api/SuperAdmin/loginSuperAdmin.api";
import { reinviteAdmin } from "../../../api/SuperAdmin/reinviteAdmin.api";
import { adminSideSuccessMessages } from "../../../message/SuccessMessages/AdminSiteSuccessMessages/successMessages";
import { commonSuccessMessages } from "../../../message/SuccessMessages/commonSuccessMessages";

let superAdminToken, adminID;

describe("Re-Invite Admin", () => {

    describe("If the Super Admin is logged in", () => {

        before(() => {
            superAdminLogin(Cypress.env('superAdminEmail'), Cypress.env('superAdminPassword')).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('message', `${commonSuccessMessages.successfulLogin}`);
                expect(response.body.data.admin.roles).to.have.length(1);
                expect(response.body.data.admin.roles[0]).to.have.property('role', 'super_admin');
                superAdminToken = response.body.data.bearerToken;
            })
        });

        it("invite will be sent when the admin data is correct", () => {
            inviteAdmin(inviteAdminData, superAdminToken).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('message', `${adminSideSuccessMessages.successfullyInviteSent}`);
                adminID = response.body.data.data.admin.id;
            })
        });

        it("re-invite won't be sent when the admin id is empty", () => {
            reinviteAdmin("", superAdminToken).then((response) => {
                // expect(response.status).to.eq(400);
            })
        });

        it("re-invite won't be sent when the admin id is 0", () => {
            reinviteAdmin(0, superAdminToken).then((response) => {
                
            })
        });

        it("re-invite won't be sent when the admin id is not a number", () => {
            reinviteAdmin("a", superAdminToken).then((response) => {
                // expect(response.status).to.eq(400);
            })
        })

        it("re-invite will be sent when the admin id is negative integer", () => {
            reinviteAdmin(-1, superAdminToken).then((response) => {
    
            })
        })

        it("re-invite will be sent when the admin id is positive integer and valid", () => {
            reinviteAdmin(adminID, superAdminToken).then((response) => {
                
            })
        })

    });

    describe("If the Super Admin is not logged in", () => {

    });

});