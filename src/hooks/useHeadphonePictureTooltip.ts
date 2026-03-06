import { useEffect, type RefObject } from "react";
import { useTooltip } from "./useTooltip/useTooltip";
import { HoverIntent } from "../hoverIntent/HoverIntent";
import {
  selectHeadphoneById,
  type Headphone,
} from "../redux/slices/headphones/slice";
import { useSelector } from "react-redux";
import type { GlobalState } from "../redux/store";

export const useHeadphonePictureTooltip = (
  targetRef: RefObject<HTMLElement>,
  headphoneId: Headphone["id"],
): void => {
  const { addTooltip, removeTooltip, moveTooltip } = useTooltip(targetRef);

  const headphone = useSelector((state: GlobalState): Headphone | undefined =>
    selectHeadphoneById(state, headphoneId),
  );

  const headphoneName = headphone?.name ?? "Headphone Image";

  useEffect(() => {
    const onPointerMove = (event: PointerEvent): void => {
      const target = event.currentTarget as HTMLElement;
      const targetRect = target.getBoundingClientRect();

      const tooltipLeft =
        event.clientX - targetRect.left - target.clientLeft + 10;
      const tooltipTop = event.clientY - targetRect.top - target.clientTop + 10;

      moveTooltip(tooltipLeft, tooltipTop);
    };

    const onPointerCancel = (): void => {
      removeTooltip();
    };

    const hoverIntent = new HoverIntent({
      element: targetRef.current,

      over: function (lastPointerMoveEvent?: PointerEvent): void {
        if (!lastPointerMoveEvent) return;

        addTooltip(headphoneName);

        this.addEventListener("pointermove", onPointerMove);
        this.addEventListener("pointercancel", onPointerCancel);

        this.dispatchEvent(lastPointerMoveEvent);
      },

      out: function (): void {
        removeTooltip();

        this.removeEventListener("pointermove", onPointerMove);
        this.removeEventListener("pointercancel", onPointerCancel);
      },
    });

    const cleanup = function (this: HTMLElement): void {
      hoverIntent.destroy();

      this.removeEventListener("pointermove", onPointerMove);
      this.removeEventListener("pointercancel", onPointerCancel);
    };

    return cleanup.bind(targetRef.current);
  }, [targetRef, addTooltip, removeTooltip, moveTooltip, headphoneName]);
};
