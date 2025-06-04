import { compare, hash } from 'bcryptjs';
import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';

import { IUserInterface } from '../interfaces/user.interface';
import { sequelize } from '../database';


const SALT_ROUND = 10;

interface UserModelInstanceMethods extends Model {
  prototype: {
    comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
    hashPassword: (password: string) => Promise<string>;
  }
}

type UserCreationAttributes = Optional<IUserInterface, 'id'>;


const UserModel: ModelDefined<IUserInterface, UserCreationAttributes> & UserModelInstanceMethods = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // country: {
  //   type: DataTypes.STRING,
  // },
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
  ]
})as ModelDefined<IUserInterface, UserCreationAttributes> & UserModelInstanceMethods;

UserModel.addHook('beforeCreate', async (auth: Model) => {
  const hashedPassword: string = await hash(auth.dataValues.password as string, SALT_ROUND);
  auth.dataValues.password = hashedPassword;
  console.log('UserModel beforeCreate hook:', auth.dataValues);
});

UserModel.prototype.comparePassword = async function (password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
};

UserModel.prototype.hashPassword = async function (password: string): Promise<string> {
  return hash(password, SALT_ROUND);
  console.log('UserModel hashPassword method:', password);
};


export { UserModel };

