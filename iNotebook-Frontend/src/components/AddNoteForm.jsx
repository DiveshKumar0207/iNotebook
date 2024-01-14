// NOTE :
// A DIALOG MADE BY EDITTING 'headlessui/react' with 'material-tailwind'
// FORMIK AND YUP FOR STATE-MANAGEMENT AND VALIDATION

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import NoteContext from "../context/notes/NoteContext";

import { useContext } from "react";
import AlertContext from "../context/alert/AlertContext";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Minimum character length is 3")
    .required("Title is required"),
  description: Yup.string()
    .min(8, "Minimum character length is 8")
    .required("Description is required"),
  tag: Yup.string()
    .min(2, "Minimum character length is 2")
    .max(10, "Maximum character length is 10")
    .required("Tag is required"),
});

// ======================================================================================================
export default function MyModal() {
  const noteContext = useContext(NoteContext);
  const { addNote } = noteContext;
  const alertContext = useContext(AlertContext);
  const { handleAlertBar } = alertContext;

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const initialValues = {
    title: "",
    description: "",
    tag: "general",
  };
  const handleFormSubmit = (values, { setSubmitting }) => {
    // Handle  submission logic here

    // addNote() fn is from NoteContext
    addNote(values);

    handleAlertBar("Note added !");

    setSubmitting(false);
    closeModal();
  };

  return (
    <>
      <div>
        <Button type="button" onClick={openModal}>
          Add a note
        </Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* === title-start === */}
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                      {" "}
                      <p className="text-2xl font-semibold text-backgroundColor-dark">
                        New note{" "}
                      </p>
                    </Dialog.Title>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-3 h-5 w-5 cursor-pointer"
                      onClick={closeModal}
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {/* === title-end === */}
                  <div className="mt-3">
                    <p className="text-sm text-gray-500">
                      Add Title, description to that, and tag(optional).
                      <br />
                      By default, tag = &quot;general&quot;
                    </p>
                  </div>

                  {/* form  */}
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                  >
                    {({ handleSubmit, errors }) => (
                      <form onSubmit={handleSubmit} method="post">
                        <div className="mt-2">
                          <div className="grid gap-4">
                            <div></div>
                            <div>
                              <Field as={Input} label="Title" name="title" />
                              <div className=" flex h-6 items-center justify-end pr-2 text-sm text-errorColor-light">
                                <ErrorMessage name="title" component="div" />
                              </div>
                            </div>

                            <div>
                              <Field
                                as={Textarea}
                                label="Description"
                                name="description"
                              />
                              <div className=" flex h-6 items-center justify-end pr-2 text-sm text-errorColor-light">
                                <ErrorMessage
                                  name="description"
                                  component="div"
                                />
                              </div>
                            </div>
                            <div>
                              <Field as={Input} label="Tag" name="tag" />
                              <div className=" flex h-6 items-center justify-end pr-2 text-sm text-errorColor-light">
                                <ErrorMessage name="tag" component="div" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end gap-4">
                          {/* material-tailwind button */}
                          <Button
                            variant="text"
                            color="red"
                            onClick={closeModal}
                            type="button"
                          >
                            Cancel
                          </Button>

                          <button
                            type="submit"
                            className={`inline-flex  justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm  font-medium text-blue-900 outline-none ring-2 ring-blue-500 ring-offset-1  hover:bg-blue-200  active:ring-offset-2  
                                           ${
                                             Object.keys(errors).length > 0
                                               ? "cursor-not-allowed opacity-70"
                                               : ""
                                           }`}
                            // if theres a error, button will be disabled
                            disabled={Object.keys(errors).length > 0}
                          >
                            Save Note!
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
