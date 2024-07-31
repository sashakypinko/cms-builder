import { IUser } from '../../services/api/user/dto/user.dto';

export type UsersState = {
  users: IUser[];
  loading: boolean;
  error: any;
};

export type UserActionPayload = {
  id: string;
  onSuccess: () => void;
  onError: (error: any) => void;
};
