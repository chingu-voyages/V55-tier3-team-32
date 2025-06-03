import { sign, verify } from 'jsonwebtoken';

import { IUserInterface } from '../interfaces/user.interface';
import { config } from '../config';

export function signToken(payload: IUserInterface) {
  return sign(
    {
      id: payload.id,
      email: payload.email,
      username: payload.username,
    },
    config.JWT_SECRET_KEY!
  ) as unknown as IUserInterface;
}

export function verifyToken(jwtToken: string): IUserInterface  {
  const decoded: IUserInterface = verify(jwtToken, config.JWT_SECRET_KEY!) as IUserInterface;

  return decoded;
}
