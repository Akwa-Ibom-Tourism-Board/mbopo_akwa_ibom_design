import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mbọpọ Akwa Ibom | Beauty with Purpose" },
      { name: "description", content: "Mbọpọ Akwa Ibom is Akwa Ibom State’s cultural pageant and tourism-ambassador platform." },
      { property: "og:title", content: "Mbọpọ Akwa Ibom | Beauty with Purpose" },
      { property: "og:description", content: "A premium cultural pageant and tourism-ambassador platform celebrating the complete Akwa Ibom woman." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <HomePage />;
}
