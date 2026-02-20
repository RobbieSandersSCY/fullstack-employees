import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let employeeCount = 1; employeeCount <= 10; employeeCount++) {
    await createEmployee({
      name: faker.person.fullName(),
      birthday: faker.date.birthdate(),
      salary: faker.number.int({ min: 45000, max: 120000 }),
    });
  }
}
