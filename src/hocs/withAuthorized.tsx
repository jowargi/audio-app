import type { FC } from "react";
import {
  selectAuthorizedUserById,
  type User,
} from "../redux/slices/authorizedUsers/slice";
import { useAuthorizedUserIdContext } from "../components/authorizedUserIdContextProvider/AuthorizedUserIdContextProvider";
import { useSelector } from "react-redux";
import type { GlobalState } from "../redux/store";

export interface AuthorizedComponentProps {
  authorizedUser: User;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const withAuthorized = <P extends object = {}>({
  AuthorizedComponent,
  UnauthorizedComponent,
}: {
  AuthorizedComponent?: FC<P & AuthorizedComponentProps>;
  UnauthorizedComponent?: FC<P>;
}): FC<P> => {
  return function WithAuthorized(props: P) {
    const { authorizedUserId } = useAuthorizedUserIdContext();

    const authorizedUser = useSelector((state: GlobalState): User | undefined =>
      selectAuthorizedUserById(state, authorizedUserId),
    );

    if (authorizedUser)
      return AuthorizedComponent ? (
        <AuthorizedComponent {...props} authorizedUser={authorizedUser} />
      ) : null;

    return UnauthorizedComponent ? <UnauthorizedComponent {...props} /> : null;
  };
};
