export default function LoadmoreButton({ allPosts, number, setNumber }) {
  console.log(number);

  function handleClick() {
    setNumber((prevNumber) => prevNumber + 3); // 3 is the number of posts you want to load per click
  }

  return (
    <div>
      {number < allPosts?.edges.length && (
        <button
          className="mx-auto flex items-center rounded-full border border-gray-200 bg-white px-8 py-3 hover:bg-gray-200"
          onClick={handleClick}
        >
          Ladda fler
        </button>
      )}
    </div>
  );
}
