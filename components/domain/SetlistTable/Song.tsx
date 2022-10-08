import { memo } from "react"
import { Setlist } from "../../../types/setlist"

type Props = {
  song: Setlist
}

const _Song = ({ song }: Props) => {
  return (
    <>
      {song.id} : {song.songName}
    </>
  )
}

export const Song = memo(_Song)
