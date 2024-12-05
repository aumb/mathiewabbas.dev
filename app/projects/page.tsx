import { getAllProjects } from '@/lib/pocketbase';
import Link from 'next/link';
import { Navigation } from '../components/nav';
import { Card } from '../components/card';
import { Eye } from 'lucide-react';
import { Article } from './article';
import Head from 'next/head';

export const revalidate = 10;

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  // Filter and sort projects
  const publishedProjects = projects.filter(p => p.published);
  const featured = publishedProjects.find(p => p.rank === 1);
  const top2 = publishedProjects.find(p => p.rank === 2);
  const top3 = publishedProjects.find(p => p.rank === 3);
  const otherProjects = publishedProjects.filter(
    p => p.rank !== 1 && p.rank !== 2 && p.rank !== 3
  )

  console.log(publishedProjects.length)

  return (
    <>
      <Head>
        <title>Projects</title>
        <meta name="description" content="Explore a diverse collection of projects, featuring both professional work and personal innovations in software engineering and technology." />
      </Head>
      <div className="relative pb-16">
        <Navigation />
        <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Projects
            </h2>
            <p className="mt-4 text-zinc-400">
              Some of the projects are from work and some are on my own time.
            </p>
          </div>
          <div className="w-full h-px bg-zinc-800" />

          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
            {featured && (
              <Card>
                <Link href={`/projects/${featured.id}`}>
                  <article className="relative w-full h-full p-4 md:p-8">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs text-zinc-100">
                        {featured.date ? (
                          <time dateTime={new Date(featured.date).toISOString()}>
                            {Intl.DateTimeFormat(undefined, {
                              dateStyle: "medium",
                            }).format(new Date(featured.date))}
                          </time>
                        ) : (
                          <span>SOON</span>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <Eye className="w-4 h-4" />{" "}
                        {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                          featured.views ?? 0,
                        )}
                      </span>
                    </div>

                    <h2
                      id="featured-post"
                      className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                    >
                      {featured.title}
                    </h2>
                    <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                      {featured.description}
                    </p>
                    <div className="absolute bottom-4 md:bottom-8">
                      <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                        Read more <span aria-hidden="true">&rarr;</span>
                      </p>
                    </div>
                  </article>
                </Link>
              </Card>
            )}

            {top2 && top3 && (
              <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
                {[top2, top3].map((project) => (
                  <Card key={project.id}>
                    <Article project={project} />
                  </Card>
                ))}
              </div>
            )}
          </div>
          <div className="hidden w-full h-px md:block bg-zinc-800" />

          <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
            <div className="grid grid-cols-1 gap-4">
              {otherProjects
                .filter((_, i) => i % 3 === 0)
                .map((project) => (
                  <Card key={project.id}>
                    <Article project={project} />
                  </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {otherProjects
                .filter((_, i) => i % 3 === 1)
                .map((project) => (
                  <Card key={project.id}>
                    <Article project={project} />
                  </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {otherProjects
                .filter((_, i) => i % 3 === 2)
                .map((project) => (
                  <Card key={project.id}>
                    <Article project={project} />
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
