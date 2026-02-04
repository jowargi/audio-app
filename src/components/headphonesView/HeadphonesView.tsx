import { useParams } from "react-router-dom";
import type { Headphone } from "../../redux/slices/headphones/slice";
import HeadphoneCardContainer from "../headphoneCard/HeadphoneCardContainer";

export default function HeadphonesView({
  headphonesIds,
}: {
  headphonesIds: Headphone["id"][];
}) {
  const { headphoneId: activeHeadphoneId } = useParams();

  if (!activeHeadphoneId) return null;

  if (!headphonesIds.includes(activeHeadphoneId)) return null;

  return (
    <HeadphoneCardContainer
      key={activeHeadphoneId}
      headphoneId={activeHeadphoneId}
    />
  );
}
