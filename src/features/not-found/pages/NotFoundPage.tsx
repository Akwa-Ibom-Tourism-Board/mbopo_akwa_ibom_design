import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";
import { Frame, Code, Title, Copy } from "./NotFoundPage.styles";

export function NotFoundPage() {
  return (
    <Frame>
      <div>
        <Code>404</Code>
        <Title>Page not found</Title>
        <Copy>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Copy>
        <Button asChild size="lg">
          <Link to="/">Go home</Link>
        </Button>
      </div>
    </Frame>
  );
}
