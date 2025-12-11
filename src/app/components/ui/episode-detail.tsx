'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Api } from '@/lib/api'
import { getSeasonImage } from '@/lib/functions'
import { Button } from './button'
import { Card } from './card'

interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  url: string
  created: string
}

interface Location {
  id: number
  name: string
  type: string
  dimension: string
  url: string
  created: string
}

interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  image: string
  url: string
  created: string
}

interface EpisodeDetailResponse {
  episode: Episode
  characters: Character[]
  locations: Location[]
}

interface EpisodeDetailComponentProps {
  readonly episodeId: string
}

export function EpisodeDetailComponent({
  episodeId,
}: EpisodeDetailComponentProps) {
  const [data, setData] = useState<EpisodeDetailResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEpisodeDetail = async () => {
      try {
        setLoading(true)
        const response = await Api.get<EpisodeDetailResponse>(
          `/integrations/episode/${episodeId}`
        )
        setData(response.data)
      } catch (error) {
        toast.error('Erro ao buscar detalhes do episódio', {
          description:
            (error as Error).message ||
            'Falha ao buscar detalhes. Tente novamente.',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEpisodeDetail()
  }, [episodeId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-emerald-50 via-cyan-50 to-purple-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        <div className="text-2xl font-semibold bg-linear-to-r from-emerald-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
          Carregando detalhes...
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-emerald-50 via-cyan-50 to-purple-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        <div className="text-center">
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-4">
            Episódio não encontrado
          </p>
          <Link href="/">
            <Button className="bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white">
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const { episode, characters, locations } = data

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-cyan-50 to-purple-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header com botão voltar */}
        <div className="mb-6">
          <Link href="/">
            <Button className="bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white">
              ← Voltar
            </Button>
          </Link>
        </div>

        {/* Informações do Episódio */}
        <Card className="mb-8 overflow-hidden border-emerald-200 dark:border-emerald-900">
          <div className="bg-linear-to-r from-emerald-100 via-cyan-100 to-purple-100 dark:from-emerald-950 dark:via-cyan-950 dark:to-purple-950 p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative w-full md:w-80 h-48 rounded-lg overflow-hidden border-2 border-emerald-300 dark:border-emerald-700">
                <Image
                  src={getSeasonImage(episode.episode)}
                  alt={episode.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r from-emerald-500 to-cyan-500 text-white mb-3">
                  {episode.episode}
                </span>
                <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-emerald-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
                  {episode.name}
                </h1>
                <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
                  <p>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Data de Exibição:
                    </span>{' '}
                    {episode.air_date}
                  </p>
                  <p>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Criado em:
                    </span>{' '}
                    {new Date(episode.created).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Personagens */}
        <Card className="mb-8 border-emerald-200 dark:border-emerald-900">
          <div className="bg-linear-to-r from-emerald-100 via-cyan-100 to-purple-100 dark:from-emerald-950 dark:via-cyan-950 dark:to-purple-950 p-4 border-b-2 border-emerald-300 dark:border-emerald-700">
            <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
              Personagens ({characters.length})
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {characters.map(character => (
                <div
                  key={character.id}
                  className="border-2 border-emerald-200 dark:border-emerald-900 rounded-lg overflow-hidden hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={character.image}
                      alt={character.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white dark:bg-neutral-900">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                      {character.name}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {character.species} • {character.status}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      {character.location.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Localizações */}
        <Card className="border-emerald-200 dark:border-emerald-900">
          <div className="bg-linear-to-r from-emerald-100 via-cyan-100 to-purple-100 dark:from-emerald-950 dark:via-cyan-950 dark:to-purple-950 p-4 border-b-2 border-emerald-300 dark:border-emerald-700">
            <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
              Localizações ({locations.length})
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locations.map(location => (
                <div
                  key={location.id}
                  className="p-4 border-2 border-emerald-200 dark:border-emerald-900 rounded-lg hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors"
                >
                  <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100 mb-2">
                    {location.name}
                  </h3>
                  <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <p>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        Tipo:
                      </span>{' '}
                      {location.type}
                    </p>
                    <p>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        Dimensão:
                      </span>{' '}
                      {location.dimension}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
