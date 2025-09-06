
export type NFTType = {
  image: string
  audio_url: string
  name: string
}

export type NFTWithID = NFTType & { id: number }

