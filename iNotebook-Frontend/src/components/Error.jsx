import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  const goBackNavigation = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="flex h-screen w-screen items-center bg-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row">
          <div className="max-w-md">
            <div className="font-dark text-5xl font-bold">404</div>
            <p className="text-2xl font-light leading-normal md:text-3xl">
              Sorry we couldnt find this page.
            </p>
            <p className="mb-8">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>

            <button
              onClick={goBackNavigation}
              className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none active:bg-blue-600"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
