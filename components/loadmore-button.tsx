import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function LoadmoreButton({ allPosts, number, setNumber }) {
  function handleClick() {
    setNumber((prevNumber) => prevNumber + number); // is the number of posts you want to load per click
  }

  return (
    <div>
      {number < allPosts?.edges.length && (
        <button
          className="mx-auto my-8 flex items-center rounded-full border border-gray-200 bg-white px-8 py-3 hover:bg-gray-200"
          onClick={handleClick}
        >
          <ArrowPathIcon className="mr-2 h-6 w-6 text-gray-900" />
          Ladda fler
        </button>
      )}
    </div>
  );
}
