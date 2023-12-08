import { faker } from "@faker-js/faker";
import { createArchitecture, createProject, verifyInvitation } from "../../../api/Admin/handleAdmin.api";
import { createProjectData } from "../../../api/Admin/handleAdmin.data";
import { inviteAdmin } from "../../../api/SuperAdmin/inviteAdmin.api";
import { inviteAdminData } from "../../../api/SuperAdmin/inviteAdmin.data";
import { superAdminLogin } from "../../../api/SuperAdmin/loginSuperAdmin.api";
import { adminSideSuccessMessages } from "../../../message/SuccessMessages/AdminSiteSuccessMessages/successMessages";
import { commonSuccessMessages } from "../../../message/SuccessMessages/commonSuccessMessages";
import { architectureTypes } from "../../../api/roles";

let superAdminToken, ownerVerificationToken, ownerToken, projectId;

describe("Create New Architecture API Automation Testing", () => {

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
            ownerToken = response.body.data.bearerToken
        })
    })

    it("the user creates a project", () => {
        createProject(createProjectData, ownerToken).then((response) => {
            expect(response.status).to.eq(200);
            projectId = response.body.data.project.id;
        })
    });

    it('should throw status code of 200', () => {
        cy.fixture('architecture.jpeg', 'binary')
          .then((file) => Cypress.Blob.binaryStringToBlob(file, 'image/jpeg'))
          .then((blob) => {
            let architectureData = new FormData();
            architectureData.append('assets', blob, 'architecture.jpeg');
            architectureData.append('name', faker.commerce.productName());
            architectureData.append('description', faker.commerce.productDescription());
            architectureData.append('type', architectureTypes[Math.floor(Math.random() * architectureTypes.length)]);

            createArchitecture(architectureData, projectId, ownerToken).then((response) => {
              expect(response.status).to.eq(200);
            });
          });
      });

});