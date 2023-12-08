import { verifyInvitation } from "../../api/Admin/handleAdmin.api";
import { inviteAdmin } from "../../api/SuperAdmin/inviteAdmin.api";
import { inviteAdminData } from "../../api/SuperAdmin/inviteAdmin.data";
import { superAdminLogin } from "../../api/SuperAdmin/loginSuperAdmin.api";
import { adminSideSuccessMessages } from "../../message/SuccessMessages/AdminSiteSuccessMessages/successMessages";
import { commonSuccessMessages } from "../../message/SuccessMessages/commonSuccessMessages";

let superAdminToken, ownerVerificationToken;

describe("Verify Invitation API Automation Testing", () => {

    before(() => {
        superAdminLogin(Cypress.env('superAdminEmail'), Cypress.env('superAdminPassword')).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', `${commonSuccessMessages.successfulLogin}`);
            expect(response.body.data.admin.roles).to.have.length(1);
            expect(response.body.data.admin.roles[0]).to.have.property('role', 'super_admin');
            superAdminToken = response.body.data.bearerToken;
        });
    });

    it("invite will be sent when the admin data is correct", () => {
        inviteAdmin(inviteAdminData, superAdminToken).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', `${adminSideSuccessMessages.successfullyInviteSent}`);
            expect(response.body.data.data).to.have.property('verificationToken');
            ownerVerificationToken = response.body.data.data.verificationToken;
        })
    });

    it("the owner accepts the verification", () => {
        let purpose = "admin_invitation"
        verifyInvitation(ownerVerificationToken, purpose).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

});