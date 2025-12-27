import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type slugProps = {
  params: Promise<{ slug: string[] }>;
};

const NotesPage = async ({ params }: slugProps) => {
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
