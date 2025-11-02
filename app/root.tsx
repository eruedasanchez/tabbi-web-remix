import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams,
  useRouteError
} from "react-router"
import { ErrorDisplay } from "./ui"
import { getTranslations } from "./i18n"

import "./globals.css"

type LayoutProps = {
  children: React.ReactNode
}

export const links = () => [
  { rel: "shortcut icon", href: "/favicon.png", type: "image/png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
]

export function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary() {
  const error = useRouteError()
  const { locale } = useParams()
  const t = getTranslations(locale)
  
  let message = t.error.message.initial
  let details = t.error.detail.initial
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    const statusKey = String(error.status) as keyof typeof t.error.message
    message = t.error.message[statusKey] || t.error.message.default
    details = 
      t.error.detail[statusKey] ||
      error.statusText || 
      t.error.detail.default
  } else if (error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return <ErrorDisplay message={message} details={details} stack={stack} />
}