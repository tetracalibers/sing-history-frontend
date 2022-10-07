import { Song } from "./Song"
import { useGetMore } from "./useGetMore.hook"

export const SetlistTable = () => {
  const { loading, newNodes, error, loadMoreFn, staticNodes } = useGetMore({})

  if (error) return <p>Error: {JSON.stringify(error)}</p>

  return (
    <>
      <ul>
        {staticNodes.map(node => (
          <Song song={node} key={node.id} />
        ))}
        {loading ? (
          <li>Loading...</li>
        ) : (
          newNodes.map(node => <Song song={node} key={node.id} />)
        )}
      </ul>
      <button type="button" onClick={loadMoreFn}>
        more
      </button>
    </>
  )
}
