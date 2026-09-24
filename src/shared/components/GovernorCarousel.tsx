import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import governor1 from "@/assets/governor_1.png";
import governor2 from "@/assets/governor_2.png";
import governor3 from "@/assets/governor_3.png";
import governor4 from "@/assets/governor_4.jpeg";
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

const SLIDES: CarouselSlide[] = [
  {
    image: governor1,
    imageAlt: "His Excellency, Governor Umo Eno, smiling in ceremonial dress",
    eyebrow: "A State That Sees Her Daughters",
    heading: "Every Daughter, A Crown",
    quote:
      "“Akwa Ibom rises when her women rise. Mbopo is our promise that every daughter of this state will be seen, heard and celebrated.”",
  },
  {
    image: governor2,
    imageAlt: "His Excellency, Governor Umo Eno, in conversation",
    eyebrow: "The A.R.I.S.E. Agenda",
    heading: "Listening To Her Story",
    quote:
      "“We built this platform to listen, to carry the voice, ambition and courage of women from all 31 Local Government Areas onto the state stage.”",
  },
  {
    image: governor3,
    imageAlt: "His Excellency, Governor Umo Eno, laughing warmly",
    eyebrow: "Empowering A New Generation",
    heading: "Beauty With Purpose",
    quote:
      "“Mbopo is more than a crown. It is mentorship, opportunity and a platform for the next generation of Akwa Ibom women to lead.”",
  },
  {
    image: governor4,
    imageAlt: "His Excellency, Governor Umo Eno, in thoughtful conversation",
    eyebrow: "Building A Greater Akwa Ibom",
    heading: "Her Story, Our State's Pride",
    quote:
      "“Through culture, enterprise and purposeful representation, we are investing in the women who carry Akwa Ibom's story forward.”",
  },
];

const SLIDE_DURATION_MS = 7000;

export function GovernorCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((index) => (index + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [isPaused]);

  const goTo = (index: number) =>
    setActiveIndex((index + SLIDES.length) % SLIDES.length);

  return (
    <Frame
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Words from Governor Umo Eno on empowering Akwa Ibom's women"
    >
      {SLIDES.map((slide, index) => (
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
        {SLIDES.map((slide, index) => (
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
          {SLIDES.map((slide, index) => (
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
          key={activeIndex}
          $duration={SLIDE_DURATION_MS}
          $paused={isPaused}
        />
      </ProgressTrack>
    </Frame>
  );
}
