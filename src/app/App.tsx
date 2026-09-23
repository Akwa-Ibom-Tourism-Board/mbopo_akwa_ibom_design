import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./providers";
import { AppRoutes } from "./routes";
import { ScrollToHash } from "./ScrollToHash";
import { ErrorBoundary } from "./ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <BrowserRouter
          basename={import.meta.env.BASE_URL.replace(/\/+$/, "")}
        >
          <ScrollToHash />
          <AppRoutes />
        </BrowserRouter>
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
