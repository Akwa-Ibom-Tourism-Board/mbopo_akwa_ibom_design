import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./providers";
import { AppRoutes } from "./routes";
import { ScrollRestoration } from "./ScrollRestoration";
import { ErrorBoundary } from "./ErrorBoundary";
import { AskMeWidget } from "@/features/ask-me";

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <BrowserRouter>
          <ScrollRestoration />
          <AppRoutes />
          <AskMeWidget />
        </BrowserRouter>
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
