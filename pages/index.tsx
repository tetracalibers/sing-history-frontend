import type { NextPage } from "next"
import { gql, useQuery } from "@apollo/client"
import { SetlistTable } from "../components/domain/SetlistTable"

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
  return <SetlistTable />
}

export default Home
