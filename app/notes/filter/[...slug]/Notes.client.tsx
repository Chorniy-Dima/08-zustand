"use client";

import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

import css from "./Notes.module.css";

interface NotesClientProps {
  slug: string[];
}

const NotesClient = ({ slug }: NotesClientProps) => {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);

  const category = slug?.[0] === "all" ? undefined : slug?.[0];

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setName(event.target.value);
    },
    250
  );

  const { data } = useQuery({
    queryKey: ["notes", name, page, slug?.[0]],
    queryFn: () => fetchNotes(name, page, category),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onChange={handleChange} />
          {data?.notes?.length !== 0 && (data?.totalPages ?? 0) > 1 && (
            <Pagination
              totalPages={data?.totalPages ?? 0}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
          <Link className={css.button} href={"/notes/action/create"}>
            Create note +
          </Link>
        </header>
        <NoteList notes={data?.notes ?? []} />
      </div>
    </>
  );
};

export default NotesClient;
