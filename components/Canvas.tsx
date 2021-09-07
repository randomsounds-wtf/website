import React, { useState, useEffect, useRef } from 'react'

export const Canvas = ({ cb }: { cb?: (ctx: CanvasRenderingContext2D) => void }) => {
  const ref = useRef<HTMLCanvasElement>()

  const [{ h, w }, set] = useState({ h: 500, w: 500 })

  const [{ x, y }, setCoords] = useState({ x: 0, y: 0 })

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>()

  useEffect(() => {
    set({ h: window.innerHeight, w: window.innerWidth })
    if (ref.current) {
      const ctx = ref.current.getContext('2d')
      setCtx(ctx!)
    }
    const resize = () => {
      set({ h: window.innerHeight, w: window.innerWidth })
    }
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', move)

    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    if (ctx && cb) cb(ctx)
  }, [ctx])

  useEffect(() => {
    if (ctx) {
      ctx.beginPath()

      ctx.strokeStyle = '#292C36'
      if (x && y) {
        ctx.moveTo(x, y)
        setTimeout(() => {
          ctx.lineTo(x, y)

          ctx.stroke()
        }, 100)
      }
    }
  }, [x, y])

  // @ts-ignore
  return <canvas height={h} width={w} ref={ref}></canvas>
}
