import { z } from 'zod'
import { EpisodeDetailComponent } from '@/app/components/ui/episode-detail'

const paramsSchema = z.object({
  id: z.string(),
})

interface PageProps {
  params: Promise<z.infer<typeof paramsSchema>>
}

export default async function EpisodeDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const validatedParams = paramsSchema.parse(resolvedParams)
  return <EpisodeDetailComponent episodeId={validatedParams.id} />
}
