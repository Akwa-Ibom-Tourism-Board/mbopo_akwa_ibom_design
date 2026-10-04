import {
  useCallback,
  useRef,
  useState,
  type PointerEvent,
  type RefObject,
} from "react";

// Drags the element `panelRef` points at by translating it from its normal
// `position: fixed` spot — the handle (wherever handleProps ends up, e.g.
// just the header's icon/title area) only supplies the pointer events, the
// actual element being moved is whatever panelRef is attached to.
export interface DragOffset {
  x: number;
  y: number;
}

const EDGE_MARGIN = 8;

interface DragState {
  pointerId: number;
  pointerStartX: number;
  pointerStartY: number;
  offsetStartX: number;
  offsetStartY: number;
  // The panel's rect at drag start — captured once, not on every move, so
  // dragging doesn't force a layout read on each pointermove.
  rect: DOMRect;
}

export function useDraggable<T extends HTMLElement>(
  panelRef: RefObject<T | null>,
) {
  const [offset, setOffset] = useState<DragOffset>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<DragState | null>(null);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      // Let real controls inside the handle (close/minimize buttons) keep
      // working normally instead of starting a drag.
      if (
        (event.target as HTMLElement).closest(
          "button, a, input, textarea, select",
        )
      ) {
        return;
      }
      const panel = panelRef.current;
      if (!panel) return;

      dragState.current = {
        pointerId: event.pointerId,
        pointerStartX: event.clientX,
        pointerStartY: event.clientY,
        offsetStartX: offset.x,
        offsetStartY: offset.y,
        rect: panel.getBoundingClientRect(),
      };
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
    },
    [offset, panelRef],
  );

  const onPointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    const state = dragState.current;
    if (!state || event.pointerId !== state.pointerId) return;

    const dx = event.clientX - state.pointerStartX;
    const dy = event.clientY - state.pointerStartY;

    // Clamp so the panel always keeps at least EDGE_MARGIN on-screen on
    // every side — it can be dragged anywhere, just never lost off-screen.
    const maxLeft = Math.max(
      EDGE_MARGIN,
      window.innerWidth - EDGE_MARGIN - state.rect.width,
    );
    const maxTop = Math.max(
      EDGE_MARGIN,
      window.innerHeight - EDGE_MARGIN - state.rect.height,
    );
    const clampedLeft = Math.min(
      Math.max(state.rect.left + dx, EDGE_MARGIN),
      maxLeft,
    );
    const clampedTop = Math.min(
      Math.max(state.rect.top + dy, EDGE_MARGIN),
      maxTop,
    );

    setOffset({
      x: state.offsetStartX + (clampedLeft - state.rect.left),
      y: state.offsetStartY + (clampedTop - state.rect.top),
    });
  }, []);

  const endDrag = useCallback((event: PointerEvent<HTMLElement>) => {
    if (dragState.current?.pointerId === event.pointerId) {
      dragState.current = null;
      setIsDragging(false);
    }
  }, []);

  return {
    offset,
    isDragging,
    handleProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
  };
}
