import { memo } from "react"
import styled from "styled-components"
import { Setlist } from "../../../types/setlist"

const _Card = styled.div`
  position: relative;
  padding: 0.5rem auto;
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  display: flex;
  height: 100px;
  box-sizing: border-box;
  color: rgb(72, 84, 97);
  font-family: "Noto Serif JP", serif;
  justify-items: center;
  width: 40vw;
  box-shadow: rgb(17 12 46 / 15%) 0px 48px 100px 0px;
`
const Card = memo(_Card)

const _JacketImage = styled.img`
  filter: opacity(0.8);
  border-radius: 10px 0px 0px 10px;
  transform: translateZ(0px);
`
const JacketImage = memo(_JacketImage)

const _Content = styled.div`
  width: calc(100% - 100px);
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Content = memo(_Content)

const _ArtistName = styled.div`
  font-weight: 700;
`
const ArtistName = memo(_ArtistName)

const _SongName = styled.div`
  font-size: 0.8rem;
`
const SongName = memo(_SongName)

type Props = {
  song: Setlist
}

const _Song = ({ song }: Props) => {
  return (
    <Card>
      <JacketImage
        src={
          song.jacketUrl
            ? song.jacketUrl.replace("30x30", "100x100")
            : "/noimage.jpg"
        }
        width={100}
        height={100}
      />
      <Content>
        <ArtistName>{song.artistName}</ArtistName>
        <SongName>{song.songName}</SongName>
      </Content>
    </Card>
  )
}

export const Song = memo(_Song)
