"use client";

import css from "./NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Error from "./error";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <>
      {isError && <Error error={error} />}
      {isLoading && <p>Loading, please wait...</p>}
      {data && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{data?.title}</h2>
            </div>
            <p className={css.content}>{data?.content}</p>
            <p className={css.date}>{data?.createdAt}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteDetailsClient;
