import "../styles/globals.css"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import type { AppProps } from "next/app"

const cache = new InMemoryCache()
const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphiql`,
  cache,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
