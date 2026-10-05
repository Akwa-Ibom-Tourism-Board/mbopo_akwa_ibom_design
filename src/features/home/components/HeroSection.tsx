import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import heroBackdrop from "@/assets/hero-bg.webp";
import ladyPortrait from "@/assets/mbopo-hero-1.webp";
import localHairPortrait from "@/assets/mbopo-hero-local-hair.webp";
import governorPortraitOne from "@/assets/governor_1.png";
// A duplicate of woman_2.webp (also used by GovernorCarousel on the
// login/register pages), not the original — woman_2 is a tight face/
// shoulders crop with almost no transparent margin (unlike this stage's
// other slides, which are full-figure shots with real breathing room
// around them), so at this stage's fixed height it rendered edge-to-edge
// and disproportionately large next to its siblings. This copy adds
// transparent padding to match their margin-to-subject proportions,
// without touching the shared original.
import womanPortrait from "@/assets/woman-2-hero.webp";
import mbopoLogo from "@/assets/mbopo-logo-dark.webp";
import { Reveal } from "@/shared/components";
import {
  Hero,
  HeroBackdrop,
  HeroScrim,
  HeroInner,
  HeroTopRow,
  HeroLogo,
  ViewRequirementsLink,
  TextStage,
  Kicker,
  SmallScreenOnly,
  SlideImageScale,
  HeroTitle,
  HeroRule,
  HeroTagline,
  HeroCopy,
  HeroActions,
  PrimaryLink,
  GhostLink,
  Dots,
  Dot,
  ImageStage,
  SlideImage,
} from "./HeroSection.styles";

interface HeroSlide {
  image: string;
  imageAlt: string;
  kicker: ReactNode;
  title: ReactNode;
  accent: string;
  tagline: string;
  copy: string;
  // Scales the rendered image up from its bottom-anchored base — only
  // needed for a slide whose source crop is a much wider/shorter aspect
  // ratio than the others (see SlideImageScale's comment). Omit to leave
  // a slide at its natural object-fit: contain size.
  imageScale?: number;
}

const SLIDES: HeroSlide[] = [
  {
    image: ladyPortrait,
    imageAlt: "A Mbopo Akwa Ibom contestant in traditional Akwa Ibom attire",
    kicker: (
      <SmallScreenOnly>
        AKWA IBOM STATE <span>·</span> HOTELS &amp; TOURISM DEVELOPMENT
        COMMISSION
      </SmallScreenOnly>
    ),
    title: "Mbopo",
    accent: "Akwa Ibom",
    tagline: "Beauty with Purpose",
    copy: "A premium, culturally authentic pageant and tourism ambassador platform, celebrating the complete Akwa Ibom woman across all 31 Local Government Areas.",
  },
  {
    image: localHairPortrait,
    imageAlt:
      "A Mbopo Akwa Ibom contestant wearing a traditional coral beaded hairstyle",
    kicker: <>A CELEBRATION OF LOCAL CRAFT</>,
    title: "Crowned",
    accent: "in heritage",
    tagline: "Every strand tells a story",
    copy: "From coral beads to hand styled crowns, mbopo akwa ibom celebrates the artistry of our local skills and the heritage woven into every look",
  },
  {
    image: governorPortraitOne,
    imageAlt: "The Governor of Akwa Ibom State",
    imageScale: 1.2,
    kicker: <>Celebrating Beauty . Culture . Enterprise</>,
    title: "Championing",
    accent: "Akwa Ibom's daughters",
    tagline:
      "A cultural property that belongs uniquely to Akwa Ibom, turning culture into visibility, enterprise and tourism under the ARISE agenda",
    copy: "Mbopo akwa Ibom is part of a wider commitment to empowering akwa Ibom daughters across all 31 local Government areas.",
  },
  {
    image: womanPortrait,
    imageAlt: "A Mbopo Akwa Ibom contestant",
    kicker: <>THE A.R.I.S.E. AGENDA</>,
    title: "Driving",
    accent: "purposeful growth",
    tagline: "For every woman, every community",
    copy: "From culture to enterprise, Mbopo Akwa Ibom carries forward the state's vision for inclusive opportunity and pride in every corner of Akwa Ibom.",
  },
];

const AUTOPLAY_INTERVAL_MS = 5000;

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((index) => (index + 1) % SLIDES.length);
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSlide = SLIDES[activeIndex] as HeroSlide;

  return (
    <Hero
      id="top"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <HeroBackdrop $image={heroBackdrop} />
      <HeroScrim />
      <HeroInner>
        <Reveal>
          {/* Static brand mark — sits above the copy and never changes
              with the carousel, unlike TextStage below (which remounts
              on every slide change). */}
          <HeroTopRow>
            <HeroLogo src={mbopoLogo} alt="Mbopo Akwa Ibom" />
            <ViewRequirementsLink to="/#eligibility">
              View Requirements
            </ViewRequirementsLink>
          </HeroTopRow>

          <TextStage key={activeIndex}>
            <Kicker>{activeSlide.kicker}</Kicker>
            <HeroTitle>
              {activeSlide.title} <em>{activeSlide.accent}</em>
            </HeroTitle>
            <HeroRule />
            <HeroTagline>{activeSlide.tagline}</HeroTagline>
            <HeroCopy>{activeSlide.copy}</HeroCopy>
          </TextStage>
          <HeroActions>
            {/* <PrimaryLink to="/register">
              Register Now <ArrowRight size={17} />
            </PrimaryLink> */}
            {/* <GhostLink to="/presentation">Learn More</GhostLink> */}
            <Dots>
              {SLIDES.map((slide, index) => (
                <Dot
                  key={slide.image}
                  type="button"
                  $active={index === activeIndex}
                  aria-label={`Show slide ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </Dots>
          </HeroActions>
        </Reveal>

        <ImageStage>
          <SlideImageScale $scale={activeSlide.imageScale ?? 1}>
            <SlideImage
              key={activeSlide.image}
              src={activeSlide.image}
              alt={activeSlide.imageAlt}
            />
          </SlideImageScale>
        </ImageStage>
      </HeroInner>
    </Hero>
  );
}
