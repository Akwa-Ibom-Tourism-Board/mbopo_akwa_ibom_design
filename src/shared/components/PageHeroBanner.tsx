import type { ReactNode } from "react";
import { Container } from "./Container";
import {
  BannerFrame,
  BannerEyebrow,
  BannerTitle,
  BannerSubtitle,
} from "./PageHeroBanner.styles";

export interface PageHeroBannerProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
}

export function PageHeroBanner({
  eyebrow,
  title,
  subtitle,
}: PageHeroBannerProps) {
  return (
    <BannerFrame>
      <Container>
        {eyebrow && <BannerEyebrow>{eyebrow}</BannerEyebrow>}
        <BannerTitle>{title}</BannerTitle>
        {subtitle && <BannerSubtitle>{subtitle}</BannerSubtitle>}
      </Container>
    </BannerFrame>
  );
}
