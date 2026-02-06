import { useSelector } from "react-redux";
import { selectCodecById, type Codec } from "../../redux/slices/codecs/slice";
import type { GlobalState } from "../../redux/store";
import CodecType from "./CodecType";

export default function CodecTypeContainer({
  codecId,
}: {
  codecId: Codec["id"];
}) {
  const codec = useSelector((state: GlobalState): Codec | undefined =>
    selectCodecById(state, codecId),
  );

  const { type: codecType } = codec || {};

  return codecType ? <CodecType codecType={codecType} /> : null;
}
