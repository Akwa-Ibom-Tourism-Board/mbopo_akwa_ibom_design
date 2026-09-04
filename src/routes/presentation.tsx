import { createFileRoute } from "@tanstack/react-router";
import { PresentationPage } from "@/pages/PresentationPage";

export const Route = createFileRoute("/presentation")({
  component: PresentationPage,
});
