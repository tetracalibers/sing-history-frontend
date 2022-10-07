import { useGetMore } from "./useGetMore.hook"

export const SetlistTable = () => {
  const { loading, nodes, error, loadMoreFn } = useGetMore({})

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>

  return (
    <>
      <ul>
        {nodes.map(node => (
          <li key={node.id}>
            {node.artistName} : {node.songName}
          </li>
        ))}
      </ul>
      <button type="button" onClick={loadMoreFn}>
        more
      </button>
    </>
  )
}
