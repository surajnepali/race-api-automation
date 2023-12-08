import { faker } from "@faker-js/faker";

export const createProjectData = {
    name: faker.company.name(),
    location: faker.location.city(),
}