/* eslint-disable prettier/prettier */
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Quote,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import styled from "styled-components";
import heroImage from "@/assets/mbopo-hero-2.jpeg";
import { BrandMark, LogoSlot } from "@/components/BrandMark";
import { Reveal } from "@/components/Reveal";
import akwaIbomLogo from "@/assets/akwa-ibom-logo-main.png";
import akhtdcLogo from "@/assets/akhtdc-new-logo.jpeg";
import ariseLogo from "@/assets/arise-logo-main.png";

const LgaCount = "31";

export function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <Page>
      <Header $scrolled={scrolled}>
        <NavBar>
          <LogoCluster>
            <LogoImage
              src={akwaIbomLogo}
              alt="Akwa Ibom Logo"
            />
            <LogoImage
              src={ariseLogo}
              alt="Arise Logo"
            />
          </LogoCluster>
          {/* <BrandMark variant={scrolled ? "dark" : "light"} /> */}
          <NavLinks $open={menuOpen}>
            <Anchor href="#about" onClick={closeMenu}>
              About
            </Anchor>
            <Anchor href="#why-enter" onClick={closeMenu}>
              Why Enter
            </Anchor>
            <LinkButton to="/register" onClick={closeMenu}>
              Register Now <ArrowRight size={15} />
            </LinkButton>
          </NavLinks>
          <RightCluster>
            <LogoImage
              src={akhtdcLogo}
              alt="Akwa Ibom State Hotels and Tourism Development Commission Logo"
            />
            <MenuButton
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </MenuButton>
          </RightCluster>
        </NavBar>
      </Header>

      <main>
        <Hero id="top" $image={heroImage}>
          <HeroScrim />
          <HeroInner>
            <Reveal>
              <Kicker>
                AKWA IBOM STATE <span>·</span> HOTELS &amp; TOURISM DEVELOPMENT
                COMMISSION
              </Kicker>
              <HeroTitle>
                MBỌPỌ <em>AKWA IBOM</em>
              </HeroTitle>
              <HeroRule />
              <HeroTagline>Beauty with Purpose</HeroTagline>
              <HeroCopy>
                A premium, culturally authentic pageant and tourism-ambassador
                platform — celebrating the complete Akwa Ibom woman across all
                31 Local Government Areas.
              </HeroCopy>
              <HeroActions>
                <PrimaryButton to="/register">
                  Register Now <ArrowRight size={17} />
                </PrimaryButton>
                <GhostButton to="/presentation">
                  Learn More <ArrowRight size={17} />
                </GhostButton>
              </HeroActions>
            </Reveal>
          </HeroInner>
          {/* <ScrollCue href="#about">
            <span>Discover the story</span>
            <ChevronDown size={16} />
          </ScrollCue> */}
        </Hero>

        <AboutSection id="about">
          <SectionShell>
            <Reveal>
              <SectionEyebrow>THE CROWN WITHIN</SectionEyebrow>
              <SectionTitle>
                Where beauty becomes <Accent>purpose.</Accent>
              </SectionTitle>
              <AboutGrid>
                <AboutLead>
                  Mbọpọ Akwa Ibom is a state-backed cultural pageant celebrating
                  beauty, culture, character and purpose. It is a platform for
                  women to represent their communities with grace — and to carry
                  Akwa Ibom’s story further.
                </AboutLead>
                <AboutNote>
                  <Quote size={23} />
                  <span>
                    One woman. One state. A year of meaningful representation.
                  </span>
                </AboutNote>
              </AboutGrid>
              <Stats>
                <Stat>
                  <StatNumber>{LgaCount}</StatNumber>
                  <StatLabel>LGAs represented</StatLabel>
                </Stat>
                <Stat>
                  <StatNumber>01</StatNumber>
                  <StatLabel>State, one crown</StatLabel>
                </Stat>
                <Stat>
                  <StatNumber>365</StatNumber>
                  <StatLabel>Days of ambassadorship</StatLabel>
                </Stat>
              </Stats>
            </Reveal>
          </SectionShell>
        </AboutSection>

        <WhySection id="why-enter">
          <SectionShell>
            <Reveal>
              <SectionEyebrow $light>THE PLATFORM</SectionEyebrow>
              <WhyHeading>
                More than a title.
                <br />
                <em>A lasting platform.</em>
              </WhyHeading>
              <Benefits>
                <Benefit>
                  <BenefitIcon>01</BenefitIcon>
                  <div>
                    <BenefitTitle>Represent your community</BenefitTitle>
                    <BenefitText>
                      Carry the voice, pride and possibility of your LGA.
                    </BenefitText>
                  </div>
                </Benefit>
                <Benefit>
                  <BenefitIcon>02</BenefitIcon>
                  <div>
                    <BenefitTitle>Lead with mentorship</BenefitTitle>
                    <BenefitText>
                      Grow through guidance, connection and shared experience.
                    </BenefitText>
                  </div>
                </Benefit>
                <Benefit>
                  <BenefitIcon>03</BenefitIcon>
                  <div>
                    <BenefitTitle>Unlock your potential</BenefitTitle>
                    <BenefitText>
                      Access visibility, empowerment and new opportunities.
                    </BenefitText>
                  </div>
                </Benefit>
                <Benefit>
                  <BenefitIcon>04</BenefitIcon>
                  <div>
                    <BenefitTitle>Be recognised statewide</BenefitTitle>
                    <BenefitText>
                      Stand for a new generation of Akwa Ibom excellence.
                    </BenefitText>
                  </div>
                </Benefit>
              </Benefits>
            </Reveal>
          </SectionShell>
        </WhySection>

        <ValuesSection>
          <SectionShell>
            <Reveal>
              <ValuesInner>
                <Sparkles size={20} />
                <ValuesTitle>Beauty · Culture · Enterprise</ValuesTitle>
                <ValuesCopy>Your story belongs on the state stage.</ValuesCopy>
              </ValuesInner>
            </Reveal>
          </SectionShell>
        </ValuesSection>

        <CtaSection>
          <SectionShell>
            <Reveal>
              <CtaInner>
                <SectionEyebrow $light>THE NEXT CHAPTER</SectionEyebrow>
                <CtaTitle>
                  Represent your
                  <br />
                  <em>Akwa Ibom.</em>
                </CtaTitle>
                <CtaCopy>
                  Applications are open — represent your Local Government Area.
                </CtaCopy>
                <PrimaryButton to="/register">
                  Begin your application <ArrowRight size={17} />
                </PrimaryButton>
              </CtaInner>
            </Reveal>
          </SectionShell>
        </CtaSection>
      </main>

      <Footer>
        <FooterTop>
          <BrandMark variant="light" />
          <FooterAgency>
            Akwa Ibom State
            <br />
            Hotels &amp; Tourism Development Commission
          </FooterAgency>
          <FooterLinks>
            <a href="#top">Home</a>
            <a href="#about">About</a>
            <a href="#why-enter">Why Enter</a>
            <Link to="/register">Register</Link>
          </FooterLinks>
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
        </FooterTop>
        <FooterBottom>
          <span>© {new Date().getFullYear()} Mbọpọ Akwa Ibom</span>
          <span>Beauty with Purpose</span>
        </FooterBottom>
      </Footer>
      <MobileCta>
        <Link to="/register">
          Register Now <ArrowRight size={16} />
        </Link>
      </MobileCta>
    </Page>
  );
}

const Page = styled.div`
  overflow-x: hidden;
`;
const Header = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  z-index: 20;
  top: 0;
  width: 100%;
  padding: 19px 0;
  background: ${({ theme, $scrolled }) => ($scrolled ? `${theme.colors.paper}f7` : "transparent")};
  box-shadow: ${({ $scrolled }) => ($scrolled ? "0 3px 24px rgba(20,53,39,.08)" : "none")};
  backdrop-filter: blur(12px);
  transition:
    background 250ms ease,
    box-shadow 250ms ease,
    padding 250ms ease;
`;
const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(1240px, calc(100% - 48px));
  margin: 0 auto;
  gap: 20px;
`;
const LogoCluster = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;
const RightCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
const NavLinks = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 29px;
  flex: 1;
  @media (max-width: 780px) {
    position: absolute;
    top: 72px;
    right: 18px;
    left: 18px;
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    align-items: stretch;
    padding: 17px;
    background: ${({ theme }) => theme.colors.paper};
    border-radius: 18px;
    box-shadow: ${({ theme }) => theme.shadows.lifted};
  }
`;
const Anchor = styled.a`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.88;
  transition: opacity 180ms ease;
  &:hover {
    opacity: 1;
  }
  ${Header}:has(+ main) & {
  }
`;
const LinkButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 12px 17px;
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.orange};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: 0 9px 22px rgba(231, 121, 23, 0.23);
  transition:
    transform 180ms ease,
    background 180ms ease;
  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.colors.orangeBright};
  }
  @media (max-width: 780px) {
    justify-content: center;
    padding: 15px;
  }
`;
const MenuButton = styled.button`
  display: none;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  @media (max-width: 780px) {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
  }
`;
const Hero = styled.section<{ $image: string }>`
  position: relative;
  display: flex;
  min-height: min(900px, 100svh);
  background-image: url(${({ $image }) => $image});
  background-position: center top;
  background-size: cover;
  color: ${({ theme }) => theme.colors.white};
  @media (max-width: 780px) {
    min-height: 100svh;
    background-position: 85% top;   /* <-- shift right to show the lady */
    background-size: cover;         /* keep cover so she isn't distorted */
  }
`;
const HeroScrim = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      90deg,
      rgba(1, 24, 15, 0.82) 0%,
      rgba(1, 24, 15, 0.62) 40%,
      rgba(1, 24, 15, 0.12) 74%
    ),
    linear-gradient(0deg, rgba(1, 24, 15, 0.74) 0%, transparent 55%);
  @media (max-width: 780px) {
    background: linear-gradient(
      0deg,
      rgba(1, 24, 15, 0.91) 0%,
      rgba(1, 24, 15, 0.62) 47%,
      rgba(1, 24, 15, 0.08) 88%
    );
  }
`;
const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  width: min(1240px, calc(100% - 48px));
  margin: 0 auto;
  padding: 146px 0 95px;
  @media (max-width: 780px) {
    width: calc(100% - 40px);
    padding: 145px 0 110px;
    align-items: flex-end;
  }
`;
const Kicker = styled.p`
  margin: 0 0 23px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.21em;
  line-height: 1.6;
  text-transform: uppercase;
  span {
    padding: 0 8px;
    color: ${({ theme }) => theme.colors.gold};
  }
`;
const HeroTitle = styled.h1`
  max-width: 680px;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(54px, 8vw, 108px);
  font-weight: 500;
  letter-spacing: -0.05em;
  line-height: 0.9;
  em {
    display: block;
    color: ${({ theme }) => theme.colors.orangeBright};
    font-style: normal;
    font-size: 0.69em;
    letter-spacing: 0.015em;
    line-height: 1.1;
  }
`;
const HeroRule = styled.div`
  width: 78px;
  height: 2px;
  margin: 28px 0 20px;
  background: ${({ theme }) => theme.colors.orange};
`;
const HeroTagline = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(22px, 3vw, 34px);
  font-style: italic;
  color: ${({ theme }) => theme.colors.white};
`;
const HeroCopy = styled.p`
  max-width: 490px;
  margin: 17px 0 31px;
  color: rgba(255, 255, 255, 0.84);
  font-size: 15px;
  line-height: 1.75;
`;
const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;
const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 22px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: 0 11px 25px rgba(231, 121, 23, 0.2);
  transition:
    transform 180ms ease,
    background 180ms ease,
    box-shadow 180ms ease;
  &:hover {
    background: ${({ theme }) => theme.colors.orangeBright};
    transform: translateY(-2px);
    box-shadow: 0 15px 28px rgba(231, 121, 23, 0.31);
  }
`;
const GhostButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 52px;
  padding: 0 21px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.white};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition:
    background 180ms ease,
    border-color 180ms ease;
  &:hover {
    border-color: ${({ theme }) => theme.colors.white};
    background: rgba(255, 255, 255, 0.12);
  }
`;
const ScrollCue = styled.a`
  position: absolute;
  z-index: 2;
  right: max(24px, calc((100% - 1240px) / 2));
  bottom: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.76);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  span {
    transform: rotate(180deg);
  }
  @media (max-width: 780px) {
    display: none;
  }
`;
const SectionShell = styled.div`
  width: min(1120px, calc(100% - 48px));
  margin: 0 auto;
`;
const AboutSection = styled.section`
  padding: 125px 0 120px;
  background: ${({ theme }) => theme.colors.cream};
`;
const SectionEyebrow = styled.p<{ $light?: boolean }>`
  margin: 0 0 17px;
  color: ${({ theme, $light }) => ($light ? theme.colors.orangeBright : theme.colors.orange)};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`;
const SectionTitle = styled.h2`
  max-width: 680px;
  margin: 0;
  color: ${({ theme }) => theme.colors.green};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(38px, 6vw, 66px);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 0.98;
`;
const Accent = styled.span`
  color: ${({ theme }) => theme.colors.orange};
  font-style: italic;
`;
const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 90px;
  margin-top: 36px;
  align-items: end;
  @media (max-width: 780px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;
const AboutLead = styled.p`
  max-width: 630px;
  margin: 0;
  color: ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(21px, 2.4vw, 30px);
  line-height: 1.38;
`;
const AboutNote = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-start;
  padding: 17px 0 0 21px;
  border-left: 1px solid ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  line-height: 1.7;
  svg {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.orange};
  }
`;
const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 86px;
  padding-top: 30px;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 28px;
    margin-top: 55px;
  }
`;
const Stat = styled.div`
  display: flex;
  gap: 19px;
  align-items: baseline;
`;
const StatNumber = styled.span`
  color: ${({ theme }) => theme.colors.orange};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(39px, 5vw, 58px);
  line-height: 1;
`;
const StatLabel = styled.span`
  max-width: 90px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.35;
  text-transform: uppercase;
`;
const WhySection = styled.section`
  padding: 125px 0 132px;
  background: ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.white};
  background-image: radial-gradient(
    circle at 88% 18%,
    rgba(205, 164, 95, 0.15) 0 1px,
    transparent 1.5px
  );
  background-size: 21px 21px;
`;
const WhyHeading = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(42px, 6vw, 68px);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 0.99;
  em {
    color: ${({ theme }) => theme.colors.orangeBright};
    font-style: italic;
  }
`;
const Benefits = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 80px;
  margin-top: 77px;
  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;
const Benefit = styled.div`
  display: flex;
  gap: 20px;
  padding: 25px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.19);
`;
const BenefitIcon = styled.span`
  display: grid;
  width: 30px;
  height: 30px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gold};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.orangeBright};
  font-size: 10px;
  font-weight: 800;
`;
const BenefitTitle = styled.h3`
  margin: 1px 0 6px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 22px;
  font-weight: 500;
`;
const BenefitText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.63);
  font-size: 13px;
  line-height: 1.6;
`;
const ValuesSection = styled.section`
  padding: 0 0 125px;
  background: ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.white};
`;
const ValuesInner = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 33px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  svg {
    color: ${({ theme }) => theme.colors.orangeBright};
  }
`;
const ValuesTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(24px, 4vw, 41px);
  font-weight: 500;
  letter-spacing: -0.03em;
`;
const ValuesCopy = styled.p`
  margin: 0 0 0 auto;
  color: rgba(255, 255, 255, 0.65);
  font-size: 13px;
  @media (max-width: 780px) {
    display: none;
  }
`;
const CtaSection = styled.section`
  padding: 125px 0 135px;
  background: ${({ theme }) => theme.colors.greenDeep};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;
const CtaInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CtaTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(50px, 8vw, 94px);
  font-weight: 500;
  letter-spacing: -0.06em;
  line-height: 0.9;
  em {
    color: ${({ theme }) => theme.colors.orangeBright};
    font-style: italic;
  }
`;
const CtaCopy = styled.p`
  margin: 25px 0 31px;
  color: rgba(255, 255, 255, 0.66);
  font-size: 14px;
`;
const Footer = styled.footer`
  padding: 55px max(24px, calc((100% - 1120px) / 2)) 25px;
  background: ${({ theme }) => theme.colors.greenInk};
  color: ${({ theme }) => theme.colors.white};
`;
const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr auto;
  gap: 30px;
  align-items: start;
  @media (max-width: 780px) {
    grid-template-columns: 1fr 1fr;
    gap: 30px 20px;
  }
`;
const FooterAgency = styled.p`
  margin: 3px 0 0;
  color: rgba(255, 255, 255, 0.55);
  font-size: 11px;
  line-height: 1.6;
`;
const FooterLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: rgba(255, 255, 255, 0.76);
  font-size: 12px;
  a:hover {
    color: ${({ theme }) => theme.colors.orangeBright};
  }
`;
const Socials = styled.div`
  display: flex;
  gap: 8px;
`;
const Social = styled.a`
  display: grid;
  width: 29px;
  height: 29px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.7);
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  &:hover {
    border-color: ${({ theme }) => theme.colors.orange};
    color: ${({ theme }) => theme.colors.orangeBright};
  }
`;
const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 55px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.38);
  font-size: 10px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;
const MobileCta = styled.div`
  display: none;
  @media (max-width: 780px) {
    display: block;
    position: fixed;
    z-index: 15;
    right: 14px;
    bottom: 14px;
    left: 14px;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      height: 54px;
      border-radius: ${({ theme }) => theme.radii.pill};
      background: ${({ theme }) => theme.colors.orange};
      color: ${({ theme }) => theme.colors.white};
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.11em;
      text-transform: uppercase;
    }
  }
`;

const LogoImage = styled.img`
  width: 110px;
  height: 52px;
  object-fit: contain;
  display: block;
`;
