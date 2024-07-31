import { Role } from '../components/pages/users/enums/role.enum';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../store/selectors';
import { useCallback } from 'react';

const useUserRole = () => {
  const authUser = useSelector(selectAuthUser);

  const hasRole = useCallback(
    (role: Role) => {
      return authUser?.role === role;
    },
    [authUser],
  );

  return { authUser, hasRole };
};

export default useUserRole;
