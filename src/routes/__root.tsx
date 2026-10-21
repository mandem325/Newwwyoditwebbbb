import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  ScrollRestoration,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";

// Silence THREE.Clock deprecation warning
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      args[0].includes("THREE.Clock: This module has been deprecated")
    ) {
      return;
    }
    originalWarn(...args);
  };
}

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AardvarkTransitionProvider } from "../components/AardvarkZoomTransition";
import { DesktopSideDock } from "../components/DesktopSideDock";
import { GlobalMobileMenuButton } from "../components/GlobalMobileMenuButton";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Yodit Dejene — Community Development & SRHR Program Lead" },
      {
        name: "description",
        content:
          "Portfolio of Yodit Dejene — MBA. Community training, gender equality, and adolescent SRHR program leadership across Ethiopia and Africa.",
      },
      { property: "og:title", content: "Yodit Dejene — Portfolio" },
      {
        property: "og:description",
        content:
          "Community development & SRHR program leader. Empowering young African women through advocacy, training, and consortia coordination.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Cinzel:wght@400;500;600;700&family=Manrope:wght@300;400;500&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;1,6..96,400;1,6..96,500;1,6..96,600&family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&family=Anton&family=Inter:wght@300;400;500&family=Oswald:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Italianno&family=Pinyon+Script&family=Fraunces:ital,opsz,wght@0,9..144,400..900;1,9..144,400..900&family=Caveat:wght@400..700&family=Pacifico&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  // Whenever user navigates to a new route, reset the scroll position immediately
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <AardvarkTransitionProvider>
        <ScrollRestoration />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <div className="w-full min-h-screen">
          <Outlet />
        </div>
        {/* Exact 1:1 Desktop Side Moving Bar with music player, dark mode, and live clock */}
        <DesktopSideDock />
        {/* Persistent Mobile Menu Button across every page and subpage on mobile view */}
        <GlobalMobileMenuButton />
      </AardvarkTransitionProvider>
    </QueryClientProvider>
  );
}
