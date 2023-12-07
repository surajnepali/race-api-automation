/// <reference types="cypress" />

import { superAdmin } from "../../constants/superadminEndpoints";

export const reinviteAdmin = (adminID, superAdminToken) => cy.api({
    method: 'POST',
    url: Cypress.env('apiUrl') + superAdmin.reinviteAdmin + '/' + adminID + '/re',
    headers:{
        'Authorization': 'Bearer ' + superAdminToken,
    },
    failOnStatusCode: false
});