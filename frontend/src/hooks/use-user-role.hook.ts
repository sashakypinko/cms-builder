import { Role } from '../components/pages/users/enums/role.enum'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '../store/selectors'

const useUserRole = () => {
  const user = useSelector(selectAuthUser);

  const hasRole = (role: Role) => {
    return user?.role === role;
  };

  return { hasRole }
};

export default useUserRole;
