import { Sequelize } from 'sequelize';

import { config } from './config';
import { BadRequestError } from './errors/error-handlers';

console.log("Connecting to Postgres at:", config.POSTGRES_URL);


export const sequelize: Sequelize = new Sequelize(config.POSTGRES_URL!,  {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    multipleStatements: true
  }
});

export async function databaseConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Postgres database connection has been established successfully.');
  } catch (error) {
    throw new BadRequestError('Database connection error', `${error}`);
  }
}

