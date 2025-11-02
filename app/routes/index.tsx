import { redirect } from "react-router-dom"

const DEFAULT_LOCALE = "es"

export async function loader() {
  return redirect(`/${DEFAULT_LOCALE}`)
}

export default function IndexRedirectRoute() {
  return null
}
