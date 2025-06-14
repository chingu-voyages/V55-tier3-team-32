import { BadRequestError } from '../../errors/error-handlers';
import { IUserInterface } from '../../interfaces/user.interface';
import { UserModel } from '../../models/UserModel';

export const createUser = async (userData: IUserInterface) => {
  try {
    console.log('Creating user with data:', userData);
    const user = await UserModel.create(userData);
    console.log('User created successfully:', user);
    return user;
  } catch (error: unknown) {
    throw new BadRequestError(`Error creating user: ${error}`, 'createUser() method');
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await UserModel.findOne({ where: { email }});

    if (!user) {
        throw new BadRequestError('Invalid credentials', 'loginUser() method error');
      }

    const passwordsMatch = await UserModel.prototype.comparePassword(password, user.dataValues.password);

    if (!passwordsMatch) {
        throw new BadRequestError('Invalid credentials', 'loginUser() method error');
      }

      return user;
  } catch (error: unknown) {
    throw new BadRequestError(`Error userAuth: ${error}`, 'loginUser() method');
  }
};
