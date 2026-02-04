import type { Headphone } from "../../redux/slices/headphones/slice";
import RouterLink from "../routerLink/RouterLink";

interface HeadphoneLinkProps {
  headphoneId: Headphone["id"];
  headphoneName: Headphone["name"];
}

export default function HeadphoneLink({
  headphoneId,
  headphoneName,
}: HeadphoneLinkProps) {
  return (
    <RouterLink to={`/headphones/${headphoneId}`}>{headphoneName}</RouterLink>
  );
}
