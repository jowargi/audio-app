import { createContext, useCallback, useContext, useState } from "react";

interface AuthorizedUserIdContextValue {
  authorizedUserId: string | undefined;
  login: (userId: string) => void;
  logout: () => void;
}

const AuthorizedUserIdContext = createContext<AuthorizedUserIdContextValue>({
  authorizedUserId: undefined,
  login: (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _userId: string,
  ): void => undefined,
  logout: (): void => undefined,
});

export const useAuthorizedUserIdContext = (): AuthorizedUserIdContextValue =>
  useContext(AuthorizedUserIdContext);

export default function AuthorizedUserIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authorizedUserId, setAuthorizedUserId] = useState<string | undefined>(
    undefined,
  );

  const login = useCallback(
    (userId: string): void => setAuthorizedUserId(userId),
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
