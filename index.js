require('dotenv/config')

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: process.env.ELASTICSEARCH_URL })
const faker = require('faker/locale/pt_BR')

async function run() {
  const INDEX = 'school'
  const TYPE = 'student'

  for (let i = 0; i < 1000; i++) {
    await client.index({
      index: INDEX,
      type: TYPE,
      body: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: {
          city: faker.address.city(),
          country: faker.address.country(),
          phone: faker.phone.phoneNumber(),
          state: faker.address.stateAbbr(),
          street: faker.address.streetName(),
          zipCode: faker.address.zipCode()
        },
        birthDay: faker.date.past(),
        image: faker.image.avatar(),
        email: faker.internet.email(),
        userName: faker.internet.userName(),
        password: faker.internet.password(),
        ip: faker.internet.ip(),
      }
    })
  }

  await client.indices.refresh({ index: INDEX })
}

run().catch(console.log)