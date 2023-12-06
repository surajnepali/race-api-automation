/// <reference types="cypress" />

import { superAdmin } from "../../constants/superadminEndpoints";

export const inviteAdmin = (invitedAdminData, superAdminToken) => cy.api({
    method: 'POST',
    url: Cypress.env('apiUrl') + superAdmin.inviteAdmin,
    headers:{
        'Authorization': 'Bearer ' + superAdminToken,
    },  
    body: invitedAdminData,
    failOnStatusCode: false
});