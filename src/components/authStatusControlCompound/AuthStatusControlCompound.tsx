import { createContext, useContext } from "react";
import { useAuthorizedUserIdContext } from "../authorizedUserIdContextProvider/AuthorizedUserIdContextProvider";
import { useDispatch, useSelector } from "react-redux";
import type { GlobalState } from "../../redux/store";
import {
  addAuthorizedUser,
  selectAuthorizedUserById,
  type User,
} from "../../redux/slices/authorizedUsers/slice";
import { userMock } from "../../constants/userMock";
import Button from "../button/Button";
import { useThrottleFn } from "ahooks";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./AuthStatusControlCompound.module.css";
import classNames from "classnames";

interface AuthStatusContextValue {
  authorizedUserId: User["id"] | undefined;
  login: (userId: User["id"]) => void;
  logout: () => void;
}

const AuthStatusContext = createContext<AuthStatusContextValue>({
  authorizedUserId: undefined,
  login: (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _userId: User["id"],
  ): void => undefined,
  logout: (): void => undefined,
});

const useAuthStatusContext = (): AuthStatusContextValue =>
  useContext(AuthStatusContext);

const AuthStatusControlCompound = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { authorizedUserId, login, logout } = useAuthorizedUserIdContext();

  const { themeColor } = useThemeColorContext();

  return (
    <AuthStatusContext.Provider value={{ authorizedUserId, login, logout }}>
      <div
        className={classNames(
          styles.container,
          styles[`container--${themeColor}`],
        )}
      >
        {children}
      </div>
    </AuthStatusContext.Provider>
  );
};

AuthStatusControlCompound.UserName = function UserName() {
  const { authorizedUserId } = useAuthStatusContext();

  const authorizedUser = useSelector((state: GlobalState): User | undefined =>
    selectAuthorizedUserById(state, authorizedUserId),
  );

  const { themeColor } = useThemeColorContext();

  return (
    <p className={classNames(styles.name, styles[`name--${themeColor}`])}>
      {authorizedUser?.name || "Guest"}
    </p>
  );
};

AuthStatusControlCompound.AuthButton = function AuthButton() {
  const { authorizedUserId, login, logout } = useAuthStatusContext();

  const authorizedUser = useSelector((state: GlobalState): User | undefined =>
    selectAuthorizedUserById(state, authorizedUserId),
  );

  const dispatch = useDispatch();

  let handleAuthToggle = (): void => {
    if (authorizedUser) {
      logout();

      return;
    }

    dispatch(addAuthorizedUser(userMock));

    login(userMock.id);
  };

  ({ run: handleAuthToggle } = useThrottleFn(handleAuthToggle, { wait: 300 }));

  return (
    <Button onClick={handleAuthToggle}>
      {authorizedUser ? "Log Out" : "Log In"}
    </Button>
  );
};

export default AuthStatusControlCompound;
