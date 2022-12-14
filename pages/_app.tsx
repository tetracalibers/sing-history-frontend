import "../styles/globals.css"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import type { AppProps } from "next/app"
import { Setlist } from "../types/setlist"
import { Page } from "../types/pagenation"

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // フィールド名
        setlistPerPage: {
          keyArgs: false,
          // fetchMoreで取得したデータと取得済みのデータをマージ
          merge(existing: Page<Setlist>, incoming: Page<Setlist>) {
            return {
              ...(incoming ?? {}),
              edges: [...(existing?.edges ?? []), ...(incoming?.edges ?? [])],
            }
          },
        },
      },
    },
  },
})

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
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
