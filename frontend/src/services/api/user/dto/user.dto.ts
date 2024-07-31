import { Role } from '../../../../components/pages/users/enums/role.enum';

export type Avatar = File | string | null;

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  verified: boolean;
  role: Role;
  avatar: Avatar;
}
