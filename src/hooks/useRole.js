import { useMemo } from 'react';
import useAuth from './useAuth';
import { ROLES, PERMISSIONS, hasPermission } from '../utils/roleBasedAccess';

const useRole = () => {
  const { user } = useAuth();

  const userRole = useMemo(() => user?.role || ROLES.USER, [user]);

  const checkPermission = (permission) => {
    return hasPermission(userRole, permission);
  };

  const isAdmin = useMemo(() => userRole === ROLES.ADMIN, [userRole]);
  const isSuperAdmin = useMemo(() => userRole === ROLES.SUPERADMIN, [userRole]);

  return {
    role: userRole,
    isAdmin,
    isSuperAdmin,
    checkPermission,
    ROLES,
    PERMISSIONS
  };
};

export default useRole;