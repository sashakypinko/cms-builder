import { Role } from '../../../../components/pages/users/enums/role.enum'

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  verified: boolean;
  role: Role
}
