export interface IUserInterface {
  id: string,
  email: string,
  password: string,
  firstname?: string,
  lastname?: string,
  comparePassword?: () => Promise<boolean>,
}
