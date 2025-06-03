export interface IUserInterface {
  id: string,
  email: string,
  username: string,
  password: string,
  firstname?: string,
  lastname?: string,
  comparePassword?: () => Promise<boolean>,
}
