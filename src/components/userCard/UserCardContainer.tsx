import {
  withUsersPrefetch,
  type UsersPrefetchContainerProps,
} from "../../hocs/withUsersPrefetch";
import type { User } from "../../redux/slices/authorizedUsers/slice";
import UserCardSkeleton from "../../skeletons/userCard/UserCardSkeleton";
import UserCard from "./UserCard";

interface UserCardContainerProps {
  userId: User["id"] | undefined;
}

const UserCardContainer = ({
  userId,
  users,
}: UserCardContainerProps & UsersPrefetchContainerProps) => {
  const user = users.find((user: User): boolean => user.id === userId);

  const { name: userName } = user || {};

  return userName ? <UserCard userName={userName} /> : null;
};

export default withUsersPrefetch<UserCardContainerProps>({
  UsersPrefetchContainer: UserCardContainer,
  LoadingComponent: UserCardSkeleton,
});
