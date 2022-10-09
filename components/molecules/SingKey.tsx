import { useMemo } from "react"
import styled from "styled-components"
import { FlatIcon } from "../atoms/FlatIcon"
import { SharpIcon } from "../atoms/SharpIcon"

const Container = styled.div`
  width: 4.5rem;
  line-height: 1rem;

  @media (max-width: 40em) {
    width: 100%;
  }
`

const _IconGroup = styled.div`
  text-align: center;

  @media (max-width: 40em) {
    text-align: left;
  }
`

const FlatGroup = styled(_IconGroup)`
  filter: drop-shadow(#4d5dfb 0px 0px 1px);
`

const SharpGroup = styled(_IconGroup)`
  filter: drop-shadow(0px 0px 1px #ddbdfc80);
`

type Props = {
  keyValue: number
}

export const SingKey = ({ keyValue }: Props) => {
  const isSharp = useMemo(() => keyValue > 0, [])

  const count = useMemo(() => {
    return [...Array(Math.abs(keyValue))]
  }, [keyValue])

  return (
    <Container>
      {count.length !== 0 &&
        (isSharp ? (
          <SharpGroup>
            {count.map((_, i) => (
              <SharpIcon key={`sharp_${i}`} />
            ))}
          </SharpGroup>
        ) : (
          <FlatGroup>
            {count.map((_, i) => (
              <FlatIcon key={`flat_${i}`} />
            ))}
          </FlatGroup>
        ))}
    </Container>
  )
}
