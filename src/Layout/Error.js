import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);

  return (
    <div className="flex flex-col justify-center items-center text-center mt-12 p-5">
      <img src="/Assets/not-found-monkey.png" alt="error-not-found" />
      <h1 className="font-bold text-2xl text-red-500 my-5">
        <span>{err.status}</span> {err.statusText}
      </h1>
      <h1 className="font-bold text-xl text-gray-500">Sorry!</h1>
      <h2 className="font-bold text-xl text-gray-500">
        We could't find the page you're looking for.
      </h2>
      <button className="bg-red-600 text-white m-5 px-3 py-2 rounded-lg">
        <Link to="/">Home</Link>
      </button>
    </div>
  );
};

export default Error;
