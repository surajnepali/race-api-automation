import { adminEndpoints } from "../../constants/adminEndpoints";

export const verifyInvitation = (verificationToken, purpose) => cy.api({
    method: 'POST',
    url: Cypress.env('apiUrl') + adminEndpoints.inviteVerification,
    body: {
        verificationToken: verificationToken,
        purpose: purpose,
        password: "12345678"
    },
    failOnStatusCode: false
})

export const createProject = (projectData, token) => cy.api({
    method: 'POST',
    url: Cypress.env('apiUrl') + adminEndpoints.crudProject,
    headers: {
        'Authorization': 'Bearer ' + token
    },
    body: projectData,
    failOnStatusCode: false
})

export const getAllProjects = (token) => cy.api({
    method: 'GET',
    url: Cypress.env('apiUrl') + adminEndpoints.crudProject,
    headers: {
        'Authorization': 'Bearer ' + token
    },
    failOnStatusCode: false
})

export const createArchitecture = (architectureData, projectId, token) => cy.api({
    method: 'POST',
    url: Cypress.env('apiUrl') + adminEndpoints.crudProject + '/' + projectId + adminEndpoints.crudArchitecture,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token,
    },
    body: architectureData,
    failOnStatusCode: false
})

export const getAllArchitectures = (projectId, token) => cy.api({
    method: 'GET',
    url: Cypress.env('apiUrl') + adminEndpoints.crudProject + '/' + projectId + adminEndpoints.crudArchitecture,
    headers: {
        'Authorization': 'Bearer ' + token,
    },
    failOnStatusCode: false
})

export const getArchitecture = (projectId, architectureId, token) => cy.api({
    method: 'GET',
    url: Cypress.env('apiUrl') + adminEndpoints.crudProject + '/' + projectId + adminEndpoints.crudArchitecture + '/' + architectureId,
    headers: {
        'Authorization': 'Bearer ' + token,
    },
    failOnStatusCode: false
})

export const editArchitecture = (projectId, architectureId, token, editArchitectureData) => cy.api({
    method: 'PATCH',
    url: Cypress.env('apiUrl') + adminEndpoints.crudProject + '/' + projectId + adminEndpoints.crudArchitecture + '/' + architectureId,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token,
    },
    body: editArchitectureData,
    failOnStatusCode: false
})