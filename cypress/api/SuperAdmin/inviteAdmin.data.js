/// <reference types="cypress" />

import {faker} from '@faker-js/faker';
import roles from '../roles';

export const inviteAdminData = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    // role: getRandomRole(),
    role: "owner",
    company_name: faker.company.name()
};

// function getRandomRole() {
//     const randomIndex = Math.floor(Math.random() * roles.length);
//     return roles[randomIndex];
//   }