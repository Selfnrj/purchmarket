import { useEffect, useState } from "react";
import Container from "./container";
import Checkbox from "./checkbox";
import { gql, useQuery } from "@apollo/client";
import Loader from "./Loader";
import AvtalFiltered from "./avtal-filtered";

const VIEWER = gql`
  query viewer {
    viewer {
      id
    }
  }
`;

export default function SearchFilter({
  productsData,
  allCategories,
  searchString,
}) {
  const [filteredAvtal, setFilteredAvtal] = useState(
    productsData.products.edges
  );
  const [avtalTitles, setAvtalTitles] = useState(
    productsData.products.edges.map((item) => item.node.title.toLowerCase())
  );
  const [avtalContent, setAvtalContent] = useState(
    productsData.products.edges.map((item) =>
      item.node.sok.sokord.toLowerCase()
    )
  );
  const [isAllCategory, setIsAllCategory] = useState(true);
  const [filtercategories, setFiltercategories] = useState([]);

  useEffect(() => {
    const filteredPostsTitles: string[] = [...avtalTitles].filter(
      (title) => title.indexOf(searchString.trim().toLowerCase()) !== -1
    );
    const filteredPostsContent: string[] = [...avtalContent].filter(
      (title) => title?.indexOf(searchString.trim().toLowerCase()) !== -1
    );

    const refilteredPosts = [...productsData.products.edges].filter(
      (item) =>
        filteredPostsTitles.includes(item.node.title.toLowerCase()) ||
        filteredPostsContent.includes(item.node.sok.sokord.toLowerCase())
    );

    setFilteredAvtal(refilteredPosts);
  }, [searchString, avtalTitles, productsData.products.edges]);

  useEffect(() => {
    if (filtercategories.length > 0) {
      setIsAllCategory(false);
    } else {
      setIsAllCategory(true);
    }
  }, [filtercategories]);

  const {
    data: viewerData,
    loading: viewerLoading,
    error: viewerError,
  } = useQuery(VIEWER);

  if (viewerLoading) return <Loader />;
  if (viewerError) return <p>Error: {viewerError.message}</p>;

  return (
    <Container>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-4 sm:gap-8">
        <div className="mb-8 sm:mb-0">
          <div className="flex justify-between border border-transparent border-b-gray-300 pb-4 ">
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
                    setFiltercategories([
                      ...filtercategories,
                      category.node.name,
                    ]);
                  } else {
                    const selectedCategory = [...filtercategories].filter(
                      (selectedCategory) =>
                        selectedCategory !== category.node.name
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
        </div>
        <div className="col-span-3">
          <AvtalFiltered
            viewerData={viewerData}
            filteredAvtal={filteredAvtal}
            isAllCategory={isAllCategory}
            filtercategories={filtercategories}
          />
        </div>
      </div>
    </Container>
  );
}
