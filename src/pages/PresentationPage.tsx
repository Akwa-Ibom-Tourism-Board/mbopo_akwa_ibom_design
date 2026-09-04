/* eslint-disable prettier/prettier */
import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import styled from "styled-components";
import presentationPdf from "@/assets/Mbopo_Akwa_Ibom_Proposal.pdf";

// react-pdf must NEVER be statically imported at module scope — pdf.js
// touches browser-only globals (DOMMatrix, etc). A static import gets
// evaluated during SSR and crashes. We load it dynamically, inside
// useEffect, which only ever runs in the browser.
type PdfModule = typeof import("react-pdf");

const FALLBACK_TOTAL_PAGES = 13;

export function PresentationPage() {
  const [pdfModule, setPdfModule] = useState<PdfModule | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(FALLBACK_TOTAL_PAGES);
  const [docReady, setDocReady] = useState(false);
  const [pageWidth, setPageWidth] = useState(900);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load react-pdf client-side only, and pin the worker to the EXACT
  // version react-pdf bundles internally — this is what prevents the
  // "API version does not match Worker version" mismatch.
  useEffect(() => {
    let cancelled = false;
    import("react-pdf").then((mod) => {
      if (cancelled) return;
      mod.pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.mjs`;
      setPdfModule(mod);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Pages we've rendered at least once (current + neighbors), kept mounted
  // so switching between them is just an opacity crossfade — never a reload.
  const [renderedPages, setRenderedPages] = useState<Set<number>>(
    new Set([1, 2]),
  );

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        // Cap width so large screens don't render an oversized canvas
        setPageWidth(Math.min(containerRef.current.clientWidth - 32, 1100));
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const ensureRendered = useCallback((page: number, total: number) => {
    setRenderedPages((prev) => {
      const next = new Set(prev);
      next.add(page);
      if (page + 1 <= total) next.add(page + 1); // preload forward
      if (page - 1 >= 1) next.add(page - 1); // keep previous ready too
      return next;
    });
  }, []);

  const goNext = useCallback(() => {
    setCurrentPage((p) => {
      const next = Math.min(p + 1, totalPages);
      ensureRendered(next, totalPages);
      return next;
    });
  }, [totalPages, ensureRendered]);

  const goPrev = useCallback(() => {
    setCurrentPage((p) => {
      const prev = Math.max(p - 1, 1);
      ensureRendered(prev, totalPages);
      return prev;
    });
  }, [totalPages, ensureRendered]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") window.location.href = "/";
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <PresentationShell>
      <TopBar>
        <CloseButton to="/">
          <X size={20} />
          <span>Exit</span>
        </CloseButton>
        <PageIndicator>
          Page {currentPage} of {totalPages}
        </PageIndicator>
      </TopBar>

      <PDFViewer ref={containerRef}>
        {(!pdfModule || !docReady) && (
          <LoadingState>
            <Loader2 size={32} className="spin" />
            <span>Loading presentation…</span>
          </LoadingState>
        )}

        {pdfModule && (
          <pdfModule.Document
            file={presentationPdf}
            loading={null}
            onLoadSuccess={({ numPages }) => {
              setTotalPages(numPages);
              setDocReady(true);
            }}
            onLoadError={(err) => {
              // Surface load failures instead of spinning forever
              console.error("PDF failed to load:", err);
            }}
          >
            {Array.from(renderedPages).map((pageNum) => (
              <PageLayer key={pageNum} $active={pageNum === currentPage}>
                <pdfModule.Page
                  pageNumber={pageNum}
                  width={pageWidth}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  loading={null}
                />
              </PageLayer>
            ))}
          </pdfModule.Document>
        )}
      </PDFViewer>

      <NavControls>
        <NavButton
          onClick={goPrev}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={22} />
        </NavButton>
        <NavButton
          onClick={goNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={22} />
        </NavButton>
      </NavControls>

      <ProgressBar>
        <div
          style={{
            width: `${(currentPage / totalPages) * 100}%`,
            transition: "width 300ms ease",
          }}
        />
      </ProgressBar>
    </PresentationShell>
  );
}

// Styled components (matching your existing design language)
const PresentationShell = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #01180f;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(
    180deg,
    rgba(1, 24, 15, 0.95) 0%,
    transparent 100%
  );
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;

const CloseButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all 200ms ease;

  &:hover {
    background: rgba(231, 121, 23, 0.8);
  }
`;

const PageIndicator = styled.span`
  color: rgba(255, 255, 255, 0.85);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.3);
  padding: 8px 14px;
  border-radius: 50px;
`;

const PDFViewer = styled.div`
  flex: 1;
  position: relative;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 64px 16px 40px;

  canvas {
    // border-radius: 8px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    // max-width: 100%;
    width: 100% !important;
    height: auto !important;
  }
`;

// Stacked, crossfading layers instead of a remounted iframe — this is
// what removes the flash/glitch when moving between pages.
const PageLayer = styled.div<{ $active: boolean }>`
  position: ${({ $active }) => ($active ? "relative" : "absolute")};
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  pointer-events: ${({ $active }) => ($active ? "auto" : "none")};
  transition: opacity 220ms ease;
  z-index: ${({ $active }) => ($active ? 2 : 1)};
`;

const LoadingState = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  z-index: 3;

  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const NavControls = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
  display: flex;
  gap: 10px;
  z-index: 10;
`;

const NavButton = styled.button`
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  color: #fff;
  cursor: pointer;
  transition: all 200ms ease;

  &:hover:not(:disabled) {
    background: rgba(231, 121, 23, 0.8);
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);

  > div {
    height: 100%;
    background: #e77917;
  }
`;
