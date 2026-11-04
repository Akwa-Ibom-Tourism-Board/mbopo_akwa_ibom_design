import {
  useCallback,
  useRef,
  useState,
  type PointerEvent,
  type RefObject,
} from "react";

// Drags the element `panelRef` points at along one screen edge only: the
// widget always hugs the left or right side (never floats in the middle),
// and dragging just slides it up/down that side — the side itself flips
// live, the instant the pointer crosses the screen's horizontal midpoint,
// so it's never resting (or even passing through, mid-drag) at center.
export interface WidgetPosition {
  side: "left" | "right";
  // Distance from the viewport's bottom edge, in px.
  bottom: number;
}

export const WIDGET_SIDE_MARGIN = 20;
const MIN_BOTTOM = 16;

interface DragState {
  pointerId: number;
  pointerStartY: number;
  startBottom: number;
  rectHeight: number;
}

// How far the pointer has to move before a press counts as a drag rather
// than a click/tap — matters for a handle that's also itself a button
// (the floating trigger bubble), so pressing it to open the widget isn't
// mistaken for the start of a drag that then suppresses that same click.
const DRAG_THRESHOLD = 4;

export function useDraggable<T extends HTMLElement>(
  panelRef: RefObject<T | null>,
  position: WidgetPosition,
  onPositionChange: (next: WidgetPosition) => void,
) {
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<DragState | null>(null);
  // Read synchronously by a handle that's also clickable (e.g. onClick)
  // to suppress the click that otherwise follows a drag's pointerup.
  const draggedRef = useRef(false);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      // Let a control *nested inside* the handle (e.g. the header's
      // close/minimize buttons) keep working normally instead of starting
      // a drag. When the handle itself is the control (e.g. the floating
      // trigger button), this is a no-op — the drag and the click coexist,
      // disambiguated below by movement distance.
      const interactiveAncestor = (event.target as HTMLElement).closest(
        "button, a, input, textarea, select",
      );
      if (interactiveAncestor && interactiveAncestor !== event.currentTarget) {
        return;
      }
      const panel = panelRef.current;
      if (!panel) return;

      draggedRef.current = false;
      dragState.current = {
        pointerId: event.pointerId,
        pointerStartY: event.clientY,
        startBottom: position.bottom,
        rectHeight: panel.getBoundingClientRect().height,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
    },
    [panelRef, position.bottom],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const state = dragState.current;
      if (!state || event.pointerId !== state.pointerId) return;

      const dy = event.clientY - state.pointerStartY;
      if (Math.abs(dy) > DRAG_THRESHOLD) draggedRef.current = true;

      const maxBottom = Math.max(
        MIN_BOTTOM,
        window.innerHeight - MIN_BOTTOM - state.rectHeight,
      );
      const nextBottom = Math.min(
        Math.max(state.startBottom - dy, MIN_BOTTOM),
        maxBottom,
      );
      const nextSide: "left" | "right" =
        event.clientX < window.innerWidth / 2 ? "left" : "right";

      onPositionChange({ side: nextSide, bottom: nextBottom });
    },
    [onPositionChange],
  );

  const endDrag = useCallback((event: PointerEvent<HTMLElement>) => {
    if (dragState.current?.pointerId === event.pointerId) {
      dragState.current = null;
      setIsDragging(false);
    }
  }, []);

  return {
    isDragging,
    draggedRef,
    handleProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
  };
}
