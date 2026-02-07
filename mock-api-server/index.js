import { faker } from "@faker-js/faker";
import fs from "fs";

const generateRelationalData = () => {
  const companies = [];
  const users = [];

  // 1. Generate Companies first
  for (let i = 1; i <= 10; i++) {
    companies.push({
      id: 100 + i, // Using 101, 102, etc.
      name: faker.company.name(),
      countryCode: faker.location.countryCode(),
      market_cap: `${faker.number.int({ min: 1, max: 999 })}B`,
    });
  }

  // Extract valid IDs for the "Foreign Key"
  const validCompanyIds = companies.map((c) => c.id);

  // 2. Generate Users and link them to valid companies
  for (let i = 1; i <= 50; i++) {
    users.push({
      id: i,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      countryCode: faker.location.countryCode(),
      // Picks only from the IDs we just created
      companyId: faker.helpers.arrayElement(validCompanyIds),
    });
  }

  const db = { companies, users };
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
  console.log("✅ db.json generated with strict referential integrity!");
};

generateRelationalData();
