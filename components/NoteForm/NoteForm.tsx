import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import type { NoteMin } from "../../types/note";
import { createNote } from "@/lib/api";

interface NoteFormProps {
  onClose: () => void;
}

const initialValues: NoteMin = {
  title: "",
  content: "",
  tag: "Todo",
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 charecters")
    .max(50, "Too long title")
    .required("Title is required"),
  content: Yup.string().max(500, "Too long content"),
  tag: Yup.string()
    .required("Tag is required")
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"]),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: (note: NoteMin) => createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleSubmit = (values: NoteMin, actions: FormikHelpers<NoteMin>) => {
    mutationCreate.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
        onClose();
      },
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={false}>
              Create note
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}
