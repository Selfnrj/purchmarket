import { ArrowPathIcon } from "@heroicons/react/24/outline";

type Props = {
  postNum: number;
  setNumber: any;
};

export default function LoadmoreButton({ postNum, setNumber }: Props) {
  function handleClick() {
    setNumber((prevNumber) => prevNumber + postNum); // is the number of posts you want to load per click
  }

  return (
    <button
      className="mx-auto my-8 flex items-center rounded-full border border-gray-200 bg-white px-8 py-3 hover:bg-gray-200"
      onClick={handleClick}
    >
      <ArrowPathIcon className="mr-2 h-6 w-6 text-gray-900" />
      Ladda fler
    </button>
  );
}
