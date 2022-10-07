import type { NextPage } from "next"
import { gql, useQuery } from "@apollo/client"

const SETLIST_QUERY = gql`
  query {
    setlist {
      artistName
      songName
      id
    }
  }
`

type Setlist = {
  artistName: string
  songName: string
  id: string
}

type SetlistResponse = {
  setlist: Setlist[]
}

const Home: NextPage = () => {
  const { loading, error, data } = useQuery<SetlistResponse>(SETLIST_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>

  if (!data?.setlist) return null

  return (
    <ul>
      {data?.setlist.map(song => (
        <li key={song.id}>
          {song.artistName}: {song.songName}
        </li>
      ))}
    </ul>
  )
}

export default Home
