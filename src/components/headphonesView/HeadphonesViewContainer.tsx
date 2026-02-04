import { useSelector } from "react-redux";
import { selectHeadphonesIds } from "../../redux/slices/headphones/slice";
import HeadphonesView from "./HeadphonesView";

export default function HeadphonesViewContainer() {
  const headphonesIds = useSelector(selectHeadphonesIds);

  return headphonesIds.length ? (
    <HeadphonesView headphonesIds={headphonesIds} />
  ) : null;
}
