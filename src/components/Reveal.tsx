import { useEffect, useRef, useState, type ReactNode } from "react";
import styled from "styled-components";

const RevealFrame = styled.div<{ $visible: boolean; $delay: number }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? "translateY(0)" : "translateY(22px)")};
  transition: opacity 800ms ease ${({ $delay }) => $delay}ms, transform 800ms ease ${({ $delay }) => $delay}ms;
`;

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <RevealFrame ref={ref} $visible={visible} $delay={delay}>{children}</RevealFrame>;
}