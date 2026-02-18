import type { FC } from "react";
import type { User } from "../redux/slices/authorizedUsers/slice";
import { useGetUsersQuery } from "../redux/api/users/api";
import ErrorFallback from "../components/errorFallback/ErrorFallback";

export interface UsersPrefetchContainerProps {
  users: User[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const withUsersPrefetch = <P extends object = {}>({
  UsersPrefetchContainer,
  LoadingComponent,
}: {
  UsersPrefetchContainer: FC<P & UsersPrefetchContainerProps>;
  LoadingComponent: FC;
}): FC<P> => {
  return function WithUsersPrefetch(props: P) {
    const {
      data: users,
      error,
      isLoading,
      isFetching,
      isError,
    } = useGetUsersQuery();

    if (isLoading || isFetching) return <LoadingComponent />;

    if (isError)
      return (
        <ErrorFallback
          name={"status" in error ? error.status.toString() : undefined}
          message={"error" in error ? error.error : undefined}
        />
      );

    return users ? <UsersPrefetchContainer {...props} users={users} /> : null;
  };
};
