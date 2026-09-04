import { createFileRoute } from "@tanstack/react-router";
import { RegisterPage } from "@/pages/RegisterPage";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register | Mbọpọ Akwa Ibom" },
      { name: "description", content: "Apply to represent your Local Government Area through Mbọpọ Akwa Ibom." },
      { property: "og:title", content: "Register | Mbọpọ Akwa Ibom" },
      { property: "og:description", content: "Apply to represent your Local Government Area through Mbọpọ Akwa Ibom." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});