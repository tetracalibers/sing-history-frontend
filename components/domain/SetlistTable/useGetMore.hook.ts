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
  const [nodes, setNodes] = useState<Setlist[]>([])

  const loadMoreFn = useCallback(async () => {
    if (data) {
      const { endCursor } = data.setlistPerPage.pageInfo
      await fetchMore({ variables: { loadOnce, cursor: endCursor } })
    }
  }, [data, fetchMore, router])

  useMemo(() => {
    if (data) {
      const { edges } = data.setlistPerPage
      setNodes(edges.map(edge => edge.node))
      router.push({ query: { count: edges.length } }, undefined, {
        scroll: false,
      })
    }
  }, [data])

  return {
    nodes,
    loading,
    loadMoreFn,
    error,
  } as const
}
