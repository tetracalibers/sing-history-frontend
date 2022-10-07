import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { useCallback, useMemo, useState } from "react"
import { Setlist, SetlistPerPage } from "../../../types/setlist"

const MORE_SETLIST_QUERY = gql`
  query MoreSetList($loadOnce: Int, $cursor: String) {
    setlistPerPage(first: $loadOnce, after: $cursor) {
      edges {
        node {
          id
          artistName
          songName
        }
      }
      static @client {
        node {
          id
          artistName
          songName
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`

type HookArgs = {
  loadFirst?: number
  loadOnce?: number
}

export const useGetMore = ({ loadFirst = 10, loadOnce = 5 }: HookArgs) => {
  const router = useRouter()

  const { data, loading, fetchMore, error } = useQuery<SetlistPerPage>(
    MORE_SETLIST_QUERY,
    {
      variables: {
        loadOnce: isNaN(Number(router.query["count"]))
          ? loadFirst
          : Number(router.query["count"]),
      },
    },
  )
  const [staticNodes, setStaticNodes] = useState<Setlist[]>([])
  const [newNodes, setNewNodes] = useState<Setlist[]>([])

  const loadMoreFn = useCallback(async () => {
    if (data) {
      const { endCursor } = data.setlistPerPage.pageInfo
      await fetchMore({ variables: { loadOnce, cursor: endCursor } })
    }
  }, [data, fetchMore, router])

  useMemo(() => {
    if (data) {
      const { static: staticEdges, edges } = data.setlistPerPage
      setStaticNodes(staticEdges?.map(edge => edge.node) ?? [])
      setNewNodes(edges.map(edge => edge.node))
      const count = (staticEdges?.length ?? 0) + edges.length
      router.push({ query: { count } })
    }
  }, [data])

  return {
    staticNodes,
    newNodes,
    loading,
    loadMoreFn,
    error,
  } as const
}
