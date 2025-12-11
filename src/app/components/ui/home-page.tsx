'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Api } from '@/lib/api'
import { getSeasonImage } from '@/lib/functions'
import { Button } from './button'
import { Card } from './card'

interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  image: string
  url: string
  created: string
}

interface ApiResponse {
  data: Episode[]
  meta: {
    page: number
    take: number
    itemCount: number
    pageCount: number
    hasPreviousPage: boolean
    hasNextPage: boolean
  }
}

export function HomeComponent() {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [meta, setMeta] = useState<ApiResponse['meta'] | null>(null)

  const fetchEpisodes = async (page: number) => {
    try {
      setLoading(true)
      const response = await Api.get<ApiResponse>(
        `/integrations/episodes?page=${page}&take=10`
      )
      setEpisodes(response.data.data)
      setMeta(response.data.meta)
    } catch (error) {
      toast.error('Erro ao buscar episódios', {
        description:
          (error as Error).message ||
          'Falha ao buscar episódios. Tente novamente.',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEpisodes(currentPage)
  }, [currentPage])

  const handlePreviousPage = () => {
    if (meta?.hasPreviousPage) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const handleNextPage = () => {
    if (meta?.hasNextPage) {
      setCurrentPage(prev => prev + 1)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-emerald-50 via-cyan-50 to-purple-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        <div className="text-2xl font-semibold bg-linear-to-r from-emerald-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
          Carregando episódios...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-cyan-50 to-purple-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-linear-to-r from-emerald-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
          Rick and Morty - Episódios
        </h1>

        <Card className="overflow-hidden border-emerald-200 dark:border-emerald-900">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-emerald-100 via-cyan-100 to-purple-100 dark:from-emerald-950 dark:via-cyan-950 dark:to-purple-950 border-b-2 border-emerald-300 dark:border-emerald-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                    Imagem
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                    Episódio
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                    Nome
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                    Data de Exibição
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                    Criado em
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-200 dark:divide-emerald-900">
                {episodes.map(episode => (
                  <tr
                    key={episode.id}
                    className="hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <Link href={`/episode/${episode.id}`}>
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden border-2 border-emerald-300 dark:border-emerald-700">
                          <Image
                            src={getSeasonImage(episode.episode)}
                            alt={episode.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/episode/${episode.id}`}>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r from-emerald-500 to-cyan-500 text-white">
                          {episode.episode}
                        </span>
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-medium text-neutral-900 dark:text-neutral-100">
                      <Link href={`/episode/${episode.id}`}>
                        {episode.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">
                      <Link href={`/episode/${episode.id}`}>
                        {episode.air_date}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400 text-sm">
                      <Link href={`/episode/${episode.id}`}>
                        {new Date(episode.created).toLocaleDateString('pt-BR')}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          <div className="bg-linear-to-r from-emerald-50 via-cyan-50 to-purple-50 dark:from-emerald-950/30 dark:via-cyan-950/30 dark:to-purple-950/30 px-6 py-4 border-t-2 border-emerald-300 dark:border-emerald-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Página{' '}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {meta?.page}
                </span>{' '}
                de{' '}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {meta?.pageCount}
                </span>
                <span className="ml-4">
                  Total:{' '}
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {meta?.itemCount}
                  </span>{' '}
                  episódios
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handlePreviousPage}
                  disabled={!meta?.hasPreviousPage}
                  className="bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                >
                  <ArrowLeft className="size-4" /> Anterior
                </Button>
                <Button
                  onClick={handleNextPage}
                  disabled={!meta?.hasNextPage}
                  className="bg-linear-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                >
                  Próxima <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
