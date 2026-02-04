import { useSelector } from "react-redux";
import {
  selectHeadphoneById,
  type Headphone,
} from "../../redux/slices/headphones/slice";
import type { GlobalState } from "../../redux/store";
import HeadphoneLink from "./HeadphoneLink";

export default function HeadphoneLinkContainer({
  headphoneId,
}: {
  headphoneId: Headphone["id"];
}) {
  const headphone = useSelector((state: GlobalState): Headphone | undefined =>
    selectHeadphoneById(state, headphoneId),
  );

  const { name: headphoneName } = headphone || {};

  return headphoneId && headphoneName ? (
    <HeadphoneLink headphoneId={headphoneId} headphoneName={headphoneName} />
  ) : null;
}
