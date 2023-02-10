import Checkbox from "./checkbox";

export default function Filter({
  allCategories,
  setFiltercategories,
  setIsAllCategory,
  filtercategories,
}) {
  return (
    <>
      <div className="flex justify-between border border-transparent border-b-gray-300 pb-4">
        Filter
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={() => {
            setFiltercategories([]);
            setIsAllCategory(true);
          }}
        >
          Återställ filter
        </button>
      </div>
      <h6 className="mt-8 mb-4 text-xs font-bold uppercase text-gray-500">
        Kategori
      </h6>
      {allCategories.edges
        /* .filter((exclude) => exclude.node?.name !== "Nyhet") */
        .map((category) => (
          <Checkbox
            key={category.node.id}
            handleClick={() => {
              if (!filtercategories.includes(category.node.name)) {
                setFiltercategories([...filtercategories, category.node.name]);
              } else {
                const selectedCategory = [...filtercategories].filter(
                  (selectedCategory) => selectedCategory !== category.node.name
                );
                setFiltercategories(selectedCategory);
              }
            }}
            name={category.node.name}
            checked={
              filtercategories.includes(category.node.name) ? "checked" : ""
            }
          />
        ))}
    </>
  );
}
