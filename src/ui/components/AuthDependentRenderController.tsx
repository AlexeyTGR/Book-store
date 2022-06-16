import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store';

const AuthDependentRenderController: React.FC<{
  children: JSX.Element;
  noAuthOnly?: boolean;
  redirectTo?: string;
}> = (props) => {
  const user = useAppSelector((state) => state.userReducer.user);

  if (!user) {
    if (props.noAuthOnly) {
      return props.children;
    }
    if (props.redirectTo) {
      return <Navigate to={props.redirectTo} />;
    }

    return null;
  }
  if (props.noAuthOnly) {
    if (props.redirectTo) {
      return <Navigate to={props.redirectTo} />;
    }

    return null;
  }
  return props.children;
};

export default AuthDependentRenderController;
