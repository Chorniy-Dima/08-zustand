import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type SlugProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: SlugProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: "Filtered Notes",
    description: `Notes filtered by tag "${slug}"`,
    openGraph: {
      title: "Filtered Notes",
      description: `Notes filtered by tag "${slug}"`,
      url: `https://07-routing-nextjs-rust-nu.vercel.app/notes/filter/${slug}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Filtered Notes",
        },
      ],
    },
  };
}

const NotesPage = async ({ params }: SlugProps) => {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", slug[0]],
    queryFn: () => fetchNotes(undefined, undefined, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient slug={slug} />
    </HydrationBoundary>
  );
};

export default NotesPage;
