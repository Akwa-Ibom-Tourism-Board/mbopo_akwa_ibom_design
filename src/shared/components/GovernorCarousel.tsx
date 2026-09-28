import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import governor1 from "@/assets/governor_1.webp";
import governor2 from "@/assets/governor_2.webp";
import woman1 from "@/assets/woman_1.webp";
import woman2 from "@/assets/woman_2.webp";
import woman3 from "@/assets/woman_3.webp";
import woman4 from "@/assets/woman_4.webp";
import woman5 from "@/assets/woman_5.webp";
import woman6 from "@/assets/woman_6.webp";
import {
  Frame,
  SlideFigure,
  PortraitImage,
  TopScrim,
  BottomScrim,
  DotTexture,
  ContentBlock,
  ContentInner,
  EyebrowRow,
  EyebrowRule,
  Eyebrow,
  Heading,
  Quote,
  ControlsRow,
  Dots,
  Dot,
  Arrows,
  ArrowButton,
  ProgressTrack,
  ProgressFill,
} from "./GovernorCarousel.styles";

interface CarouselSlide {
  image: string;
  imageAlt: string;
  eyebrow: string;
  heading: string;
  quote: string;
}

// Two independent slide sets so the sign-up and sign-in screens don't feel
// like the same page — each pairs one governor photo (a real, quoted
// figure) with three of the new applicant portraits. The portraits are
// stock/representative photography, not named individuals, so their copy
// is written as the programme's own voice (no quotation marks implying
// they said it) rather than invented first-person testimonials.
const SIGNUP_SLIDES: CarouselSlide[] = [
  {
    image: governor1,
    imageAlt: "His Excellency, Governor Umo Eno, smiling in ceremonial dress",
    eyebrow: "A State That Sees Her Daughters",
    heading: "Every Daughter, A Crown",
    quote:
      "“Akwa Ibom rises when her women rise. Mbopo is our promise that every daughter of this state will be seen, heard and celebrated.”",
  },
  {
    image: woman1,
    imageAlt: "An Mbopo applicant in traditional coral beads and braided crown",
    eyebrow: "Rooted In Heritage",
    heading: "Carrying Culture Forward",
    quote:
      "Every bead and braid tells a story generations in the making — Mbopo Akwa Ibom carries that heritage into a new era.",
  },
  {
    image: woman2,
    imageAlt: "An Mbopo applicant in coral and gold traditional beads",
    eyebrow: "Grace With Purpose",
    heading: "More Than A Crown",
    quote:
      "Built on grace, confidence and purposeful leadership — for the woman ready to represent her state with pride.",
  },
  {
    image: woman3,
    imageAlt:
      "An Mbopo applicant with an elaborate braided crown and coral beads",
    eyebrow: "A Legacy Of Excellence",
    heading: "Your Story, Her Crown",
    quote:
      "From the Local Government stage to the Grand Finale, every applicant carries forward a legacy of excellence and cultural pride.",
  },
];

const LOGIN_SLIDES: CarouselSlide[] = [
  {
    image: governor2,
    imageAlt: "His Excellency, Governor Umo Eno, in conversation",
    eyebrow: "The A.R.I.S.E. Agenda",
    heading: "Listening To Her Story",
    quote:
      "“We built this platform to listen, to carry the voice, ambition and courage of women from all 31 Local Government Areas onto the state stage.”",
  },
  {
    image: woman4,
    imageAlt: "An Mbopo applicant in teal traditional beads",
    eyebrow: "Elegance & Ambition",
    heading: "Welcome Back",
    quote:
      "Sign in to continue your journey — Akwa Ibom is proud of every woman who steps forward to represent her state.",
  },
  {
    image: woman5,
    imageAlt:
      "An Mbopo applicant in a coral and gold beaded crown with a traditional comb",
    eyebrow: "A Warm Welcome Back",
    heading: "Step Back Into Your Story",
    quote:
      "Every visit brings you closer to the stage — sign in and keep building the story only you can tell.",
  },
  {
    image: woman6,
    imageAlt: "An Mbopo applicant in a cowrie shell choker and gold hoops",
    eyebrow: "Tradition Meets Ambition",
    heading: "Your Journey Continues",
    quote:
      "From your first sign-in to the Grand Finale, Akwa Ibom is walking this journey with you.",
  },
];

const SLIDE_DURATION_MS = 7000;

export interface GovernorCarouselProps {
  variant: "signup" | "login";
}

export function GovernorCarousel({ variant }: GovernorCarouselProps) {
  const slides = variant === "signup" ? SIGNUP_SLIDES : LOGIN_SLIDES;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
  }, [variant]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const goTo = (index: number) =>
    setActiveIndex((index + slides.length) % slides.length);

  return (
    <Frame
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Words on empowering Akwa Ibom's women through Mbopo Akwa Ibom"
    >
      {slides.map((slide, index) => (
        <SlideFigure key={slide.image} $active={index === activeIndex}>
          <PortraitImage
            src={slide.image}
            alt={slide.imageAlt}
            $active={index === activeIndex}
          />
        </SlideFigure>
      ))}

      <TopScrim />
      <BottomScrim />
      <DotTexture />

      <ContentBlock>
        {slides.map((slide, index) => (
          <ContentInner key={slide.image} $active={index === activeIndex}>
            <EyebrowRow>
              <EyebrowRule />
              <Eyebrow>{slide.eyebrow}</Eyebrow>
            </EyebrowRow>
            <Heading>{slide.heading}</Heading>
            <Quote>{slide.quote}</Quote>
          </ContentInner>
        ))}
      </ContentBlock>

      <ControlsRow>
        <Dots>
          {slides.map((slide, index) => (
            <Dot
              key={slide.image}
              type="button"
              $active={index === activeIndex}
              aria-label={`Show slide ${index + 1}`}
              onClick={() => goTo(index)}
            />
          ))}
        </Dots>
        <Arrows>
          <ArrowButton
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(activeIndex - 1)}
          >
            <ChevronLeft size={18} />
          </ArrowButton>
          <ArrowButton
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(activeIndex + 1)}
          >
            <ChevronRight size={18} />
          </ArrowButton>
        </Arrows>
      </ControlsRow>

      <ProgressTrack>
        <ProgressFill
          key={`${variant}-${activeIndex}`}
          $duration={SLIDE_DURATION_MS}
          $paused={isPaused}
        />
      </ProgressTrack>
    </Frame>
  );
}
