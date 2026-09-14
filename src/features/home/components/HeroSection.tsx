import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import heroBackdrop from "@/assets/hero-bg.png";
import ladyPortrait from "@/assets/mbopo-hero-1.png";
import governorPortraitOne from "@/assets/governor_1.png";
import governorPortraitTwo from "@/assets/governor_2.png";
import mbopoLogo from "@/assets/mbobpo_logo.png";
import { Reveal } from "@/shared/components";
import {
  Hero,
  HeroBackdrop,
  HeroScrim,
  HeroInner,
  HeroLogo,
  TextStage,
  Kicker,
  HeroTitle,
  HeroRule,
  HeroTagline,
  HeroCopy,
  HeroActions,
  PrimaryLink,
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
}

const SLIDES: HeroSlide[] = [
  {
    image: ladyPortrait,
    imageAlt: "A Mbobpo Akwa Ibom contestant in traditional Akwa Ibom attire",
    kicker: (
      <>
        AKWA IBOM STATE <span>·</span> HOTELS &amp; TOURISM DEVELOPMENT
        COMMISSION
      </>
    ),
    title: "Mbobpo",
    accent: "Akwa Ibom",
    tagline: "Beauty with Purpose",
    copy: "A premium, culturally authentic pageant and tourism-ambassador platform — celebrating the complete Akwa Ibom woman across all 31 Local Government Areas.",
  },
  {
    image: governorPortraitOne,
    imageAlt: "The Governor of Akwa Ibom State",
    kicker: <>A GOVERNMENT-BACKED INITIATIVE</>,
    title: "Championing",
    accent: "Akwa Ibom's daughters",
    tagline: "Supported by the State Government",
    copy: "Mbobpo Akwa Ibom is proudly backed by the Akwa Ibom State Government — part of a wider commitment to empowering women across every Local Government Area.",
  },
  {
    image: governorPortraitTwo,
    imageAlt: "The Governor of Akwa Ibom State",
    kicker: <>THE A.R.I.S.E. AGENDA</>,
    title: "Driving",
    accent: "purposeful growth",
    tagline: "For every woman, every community",
    copy: "From culture to enterprise, Mbobpo Akwa Ibom carries forward the state's vision for inclusive opportunity and pride in every corner of Akwa Ibom.",
  },
];

const AUTOPLAY_INTERVAL_MS = 2000;

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
          <HeroLogo src={mbopoLogo} alt="Mbobpo Akwa Ibom" />

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
            <PrimaryLink to="/register">
              Register Now <ArrowRight size={17} />
            </PrimaryLink>
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
          <SlideImage
            key={activeSlide.image}
            src={activeSlide.image}
            alt={activeSlide.imageAlt}
          />
        </ImageStage>
      </HeroInner>
    </Hero>
  );
}
