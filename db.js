import { faker } from "@faker-js/faker/locale/ru";

export function generateData() {
  const data = {
    products: [],
    manufacturers: [],
    users: [],
    roles: [],
  };

  data.roles.push(
    { id: 1, name: "Админ", pages: ["/products", "/algorithms", "/"] },
    { id: 2, name: "Пользователь", pages: ["/products", "/algorithms", "/"] }
  );

  data.users.push(
    {
      id: 1,
      name: faker.person.fullName(),
      email: "admin@example.com",
      password: "admin123",
      roles: [1, 2],
    },
    {
      id: 2,
      name: faker.person.fullName(),
      email: "user@example.com",
      password: "user123",
      roles: [2],
    }
  );

  for (let i = 1; i <= 10; i++) {
    data.manufacturers.push({
      id: i,
      name: faker.company.name(),
    });
  }

  for (let i = 1; i <= 100; i++) {
    data.products.push({
      id: i,
      name: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 100 }),
      price: faker.commerce.price(),
      photoUrl: faker.image.url(),
      manufacturerId: faker.helpers.arrayElement(data.manufacturers).id,
    });
  }

  return data;
}
