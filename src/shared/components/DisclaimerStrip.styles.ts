import styled from "styled-components";

// Brand orange, matching the site's primary CTA color. Always rendered as
// the first row inside whichever fixed/sticky header frame is using it
// (Navbar, DashboardTopbar), never as an independent fixed/sticky element
// of its own — two independently fixed bars stacking correctly would need
// hardcoded height coordination; nesting inside one shared fixed frame
// sidesteps that entirely.
export const Strip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 7px 16px;
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: #ffffff;
  text-align: center;
`;

export const StripText = styled.p`
  margin: 0;
  max-width: 900px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: 0.01em;

  /* Slightly larger once there's room for it to sit on one line. */
  @media (min-width: 700px) {
    font-size: 12px;
  }
`;

export const StripIcon = styled.span`
  display: flex;
  flex: 0 0 auto;
  align-self: flex-start;
  margin-top: 1px;

  @media (min-width: 480px) {
    align-self: center;
    margin-top: 0;
  }
`;
