import React, { useEffect, PropsWithChildren, useState } from 'react'

type Props = PropsWithChildren<{
  rotateForce: number
  perspective: number
  minWidth: number
  minHeight: number
}> &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Box3D = ({ rotateForce, children, minWidth, minHeight, ...props }: Props) => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [{ width, height }, setDocument] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setDocument({
      width: document.body.offsetWidth,
      height: document.body.offsetHeight
    })
  }, [])

  return (
    <div
      onMouseMove={(e) => {
        setX(-((e.pageY / height) * 2 - 1) * rotateForce)
        setY(-((e.pageX / width) * 2 - 1) * rotateForce)
      }}
      className={`motion-box ${props.className || ''}`}
      style={{
        perspective: props.perspective,
        minWidth: minWidth,
        minHeight: minHeight
      }}
    >
      <div style={{ transformStyle: 'preserve-3d', transform: `rotateX(${x}deg) rotateY(${y}deg)` }}>{children}</div>
    </div>
  )
}
