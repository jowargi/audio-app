import { createContext, useCallback, useContext, useState } from "react";
import type { User } from "../../redux/slices/authorizedUsers/slice";

interface AuthorizedUserIdContextValue {
  authorizedUserId: User["id"] | undefined;
  login: (userId: User["id"]) => void;
  logout: () => void;
}

const AuthorizedUserIdContext = createContext<AuthorizedUserIdContextValue>({
  authorizedUserId: undefined,
  login: (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _userId: User["id"],
  ): void => {},
  logout: (): void => {},
});

export const useAuthorizedUserIdContext = (): AuthorizedUserIdContextValue =>
  useContext(AuthorizedUserIdContext);

export default function AuthorizedUserIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authorizedUserId, setAuthorizedUserId] = useState<
    User["id"] | undefined
  >(undefined);

  const login = useCallback(
    (userId: User["id"]): void => setAuthorizedUserId(userId),
    [],
  );

  const logout = useCallback((): void => setAuthorizedUserId(undefined), []);

  return (
    <AuthorizedUserIdContext.Provider
      value={{ authorizedUserId, login, logout }}
    >
      {children}
    </AuthorizedUserIdContext.Provider>
  );
}
