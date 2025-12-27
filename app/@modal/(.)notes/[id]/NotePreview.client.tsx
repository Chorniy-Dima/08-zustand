"use client";

import css from "./NotePreview.module.css";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Error from "@/app/notes/[id]/error";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <>
      <Modal onClose={handleClose}>
        {isError && <Error error={error} />}
        {isLoading && <p>Loading, please wait...</p>}
        {data && (
          <div className={css.container}>
            <div className={css.item}>
              <button className={css.backBtn} onClick={handleClose}>
                Back
              </button>
              <div className={css.header}>
                <h2>{data?.title}</h2>
              </div>
              <p className={css.content}>{data?.content}</p>
              <p className={css.date}>{data?.createdAt}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default NotePreviewClient;
