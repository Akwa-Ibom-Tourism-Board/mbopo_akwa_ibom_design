import type { ReactNode } from "react";
import akwaIbomLogo from "@/assets/akwa-ibom-logo-main.png";
import ariseLogo from "@/assets/arise-logo-main.png";
import mbopoLogo from "@/assets/mbopo-logo.webp";
import { GovernorCarousel } from "./GovernorCarousel";
import {
  Shell,
  LeftPane,
  LeftPaneBody,
  ContentColumn,
  LogoBlock,
  GovLogoRow,
  GovLogoImage,
  LogoLink,
  LogoImage,
  PageFooter,
  PageFooterText,
} from "./AuthLayout.styles";

export interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Shell>
      <LeftPane>
        <LeftPaneBody>
          <ContentColumn>
            <LogoBlock>
              <GovLogoRow>
                <GovLogoImage
                  src={akwaIbomLogo}
                  alt="Akwa Ibom State Government"
                />
                <GovLogoImage src={ariseLogo} alt="ARISE Akwa Ibom" />
              </GovLogoRow>
              <LogoLink to="/" aria-label="Mbopo Akwa Ibom home">
                <LogoImage src={mbopoLogo} alt="Mbopo Akwa Ibom" />
              </LogoLink>
            </LogoBlock>
            {children}
          </ContentColumn>
        </LeftPaneBody>
        <PageFooter>
          <PageFooterText>
            © {new Date().getFullYear()} Mbopo Akwa Ibom. All rights reserved.
          </PageFooterText>
        </PageFooter>
      </LeftPane>
      <GovernorCarousel />
    </Shell>
  );
}
