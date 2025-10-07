import { getProjectById } from '@/lib/pocketbase'
import { notFound } from 'next/navigation'
import { Header } from './header'
import { ReportView } from './view'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default async function PostPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const project = await getProjectById(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="bg-zinc-900 min-h-screen">
      <Header project={project} />
      <ReportView id={project.id} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless prose-invert">
        <MDXRemote source={project.content} />
      </article>
    </div>
  );
}
