import { clientEnv } from '../env'

export const GetApiBaseUrl = (baseURL: string = `${clientEnv.apiBaseUrl}`) => {
  return baseURL
}

const detectImageFormat = (seasonNumber: string): string => {
  const formatMap: Record<string, string> = {
    '1': 'jpg',
    '2': 'png',
    '3': 'jpg',
    '4': 'jpg',
    '5': 'webp',
    '6': 'jpeg',
    '7': 'jpg',
  }

  return formatMap[seasonNumber] || 'jpg'
}

export const getSeasonImage = (episodeCode: string) => {
  const regex = /S(\d+)E/
  const seasonMatch = regex.exec(episodeCode)
  if (seasonMatch) {
    const seasonNumber = Number.parseInt(seasonMatch[1], 10).toString()
    const format = detectImageFormat(seasonNumber)
    return `/assets/temporada-${seasonNumber}.${format}`
  }
  return '/assets/temporada-1.jpg'
}
