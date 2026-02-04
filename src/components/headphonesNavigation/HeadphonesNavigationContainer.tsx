import { useSelector } from "react-redux";
import { selectHeadphonesIds } from "../../redux/slices/headphones/slice";
import HeadphonesNavigation from "./HeadphonesNavigation";

export default function HeadphonesNavigationContainer() {
  const headphonesIds = useSelector(selectHeadphonesIds);

  return headphonesIds.length ? (
    <HeadphonesNavigation headphonesIds={headphonesIds} />
  ) : null;
}
