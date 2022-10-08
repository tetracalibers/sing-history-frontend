import { useRef, useEffect, useMemo } from "react"
import { BehaviorSubject } from "rxjs"

export const useObservedValue = <T>(value: T) => {
  const subject = useRef(new BehaviorSubject(value))

  useEffect(() => {
    subject.current.next(value)
  }, [value])

  return useMemo(() => subject.current.asObservable(), [subject])
}
