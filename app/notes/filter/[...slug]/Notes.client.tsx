"use client";

import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import css from "./Notes.module.css";

interface NotesClientProps {
  slug: string[];
}

const NotesClient = ({ slug }: NotesClientProps) => {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  console.log(slug);

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
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </header>
        <NoteList notes={data?.notes ?? []} />
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default NotesClient;
