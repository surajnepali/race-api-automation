/// <reference types="cypress" />

import { superAdmin } from "../../constants/superadminEndpoints";

export const superAdminLogin = (email, password) => cy.api({
    method: 'POST',
    url: Cypress.env('apiUrl') + superAdmin.login,
    body: {
        email,
        password
    },
    failOnStatusCode: false
});