import { customerEndpoints } from "../../constants/customerEndpoints";

export const setOTPForRegistration = (setOTPPhoneNumber) => cy.api({
    method: 'POST',
    url: Cypress.env('apiUrl') + customerEndpoints.setOTPForLogin,
    body: setOTPPhoneNumber,
    failOnStatusCode: false
});

export const register = (registerData) => cy.api({
    method: 'POST',
    url: Cypress.env('apiUrl') + customerEndpoints.register,
    body: registerData,
    failOnStatusCode: false
});

export const login = (loginData) => cy.api({
    method: 'POST',
    url: Cypress.env('apiUrl') + customerEndpoints.login,
    body: loginData,
    failOnStatusCode: false
})