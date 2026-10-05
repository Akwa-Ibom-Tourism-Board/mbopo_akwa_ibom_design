import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import akwaIbomLogo from "@/assets/akwa-ibom-logo-main.png";
import ariseLogo from "@/assets/arise-logo-main.png";
import mbopoLogo from "@/assets/mbopo-logo-dark.webp";
import {
  FooterFrame,
  FooterTop,
  BrandColumn,
  LogoRow,
  LogoImage,
  FooterAgency,
  FooterSubline,
  FooterContact,
  ColumnHeading,
  ColumnLinks,
  Socials,
  Social,
  FooterBottom,
} from "./Footer.styles";

export function Footer() {
  return (
    <FooterFrame>
      <FooterTop>
        <BrandColumn>
          <LogoRow>
            <LogoImage
              src={akwaIbomLogo}
              alt="Akwa Ibom State Government logo"
            />
            <LogoImage src={ariseLogo} alt="ARISE Akwa Ibom logo" />
          </LogoRow>
          <LogoRow>
            <LogoImage src={mbopoLogo} alt="Mbopo Akwa Ibom logo" />
          </LogoRow>
          <FooterAgency>
            Akwa Ibom State Hotels &amp; Tourism Development Commission
          </FooterAgency>
          <FooterSubline>
            Akwa Ibom State Government
            <br />
            Under the A.R.I.S.E. Agenda
          </FooterSubline>
          <FooterContact href="tel:+2348149110942">
            <Phone size={13} aria-hidden /> For Enquiries: +234 802 331 1264
          </FooterContact>
          <Socials>
            <Social href="#" aria-label="Instagram">
              ig
            </Social>
            <Social href="#" aria-label="Facebook">
              fb
            </Social>
            <Social href="#" aria-label="X">
              x
            </Social>
          </Socials>
        </BrandColumn>

        <div>
          <ColumnHeading>The Program</ColumnHeading>
          <ColumnLinks>
            <Link to="/">Home</Link>
            <Link to="/#about">About</Link>
            <Link to="/#eligibility">Eligibility</Link>
            <Link to="/#rewards">Rewards</Link>
            <Link to="/#why-enter">Why Enter</Link>
            <Link to="/#faq">FAQ</Link>
          </ColumnLinks>
        </div>

        <div>
          <ColumnHeading>Get Involved</ColumnHeading>
          <ColumnLinks>
            <Link to="/register">Register</Link>
            <Link to="/login">Log in</Link>
            <Link to="/dashboard">Dashboard</Link>
          </ColumnLinks>
        </div>

        <div>
          <ColumnHeading>Legal</ColumnHeading>
          <ColumnLinks>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </ColumnLinks>
        </div>
      </FooterTop>
      <FooterBottom>
        <span>
          © {new Date().getFullYear()} Mbopo Akwa Ibom. All rights reserved.
        </span>
        <span>Beauty with Purpose</span>
      </FooterBottom>
    </FooterFrame>
  );
}
