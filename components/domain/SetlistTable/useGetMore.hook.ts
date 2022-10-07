import { gql, useQuery } from "@apollo/client"
import { useCallback, useMemo } from "react"
import { SetlistPerPage } from "../../../types/setlist"

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
  const { data, loading, fetchMore, error } = useQuery<SetlistPerPage>(
    MORE_SETLIST_QUERY,
    { variables: { loadOnce: loadFirst } },
  )

  const loadMoreFn = useCallback(async () => {
    if (data) {
      const { setlistPerPage } = data
      const { pageInfo } = setlistPerPage
      const { endCursor: cursor } = pageInfo
      await fetchMore({ variables: { loadOnce, cursor } })
    }
  }, [data, fetchMore])

  const nodes = useMemo(() => {
    return data?.setlistPerPage?.edges?.map(edge => edge.node) ?? []
  }, [data])

  return {
    nodes,
    loading,
    loadMoreFn,
    error,
  }
}
