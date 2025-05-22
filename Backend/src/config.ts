import dotenv from 'dotenv';

dotenv.config({});

class Config {
  public  SERVER_PORT: string | undefined;
  public  SECRET_KEY_ONE: string | undefined;
  public NODE_ENV: string | undefined;
  public CLIENT_URL: string | undefined;

  constructor() {
    this.SERVER_PORT = process.env.SERVER_PORT || '4001';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
    this.NODE_ENV = process.env.NODE_ENV || 'development';
    this.CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
  }
}

export const config: Config = new Config();
