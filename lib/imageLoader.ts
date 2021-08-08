import { ImageLoader } from 'next/image'

export const imageLoader: ImageLoader = ({ width, quality, src }) => {
  return `${src}`
}
