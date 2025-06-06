import dotenv from 'dotenv';

dotenv.config({});

class Config {
  public SERVER_PORT: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public JWT_SECRET_KEY: string | undefined;
  public NODE_ENV: string | undefined;
  public CLIENT_URL: string | undefined;
  public POSTGRES_URL: string | undefined;
  public GEMINI_API_KEY: string;
  public GEMINI_MODEL: string;

  constructor() {
    this.SERVER_PORT = process.env.SERVER_PORT || '4001';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
    this.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_jwt_secret_key';
    this.NODE_ENV = process.env.NODE_ENV || 'development';
    this.CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
    this.POSTGRES_URL = process.env.POSTGRES_URL || 'postgres://myuser:mypassword@localhost:5432/mydatabase';
    this.GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
    this.GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-pro';

  }
}

export const config: Config = new Config();
