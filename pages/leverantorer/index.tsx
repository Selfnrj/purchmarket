import { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Container from "../../components/container";
import Filter from "../../components/Filter";
import LeverantorCard from "../../components/leverantor-card";
import LoadmoreButton from "../../components/loadmore-button";
import PageCoverInput from "../../components/page-coverInput";
import { getAllLeverantorer, getCategories } from "../../lib/api";
import OmslagsBild from "../../public/omslag.jpg";

export default function leverantorer({ allLeverantorer, allCategories }) {
  const [filteredAvtal, setFilteredAvtal] = useState(allLeverantorer.edges);
  const [searchString, setSearchString] = useState("");
  const [isAllCategory, setIsAllCategory] = useState(true);
  const [filtercategories, setFiltercategories] = useState([]);
  const [avtalTitles, setAvtalTitles] = useState(
    allLeverantorer.edges.map((item) => item.node.title.toLowerCase())
  );
  const [postNum, setPostNum] = useState(2); // Default number of posts dislplayed

  useEffect(() => {
    const filteredPostsTitles: string[] = [...avtalTitles].filter(
      (title) => title.indexOf(searchString.trim().toLowerCase()) !== -1
    );

    const refilteredPosts = [...allLeverantorer.edges].filter((item) =>
      filteredPostsTitles.includes(item.node.title.toLowerCase())
    );

    setFilteredAvtal(refilteredPosts);
  }, [searchString, avtalTitles, allLeverantorer.edges]);

  useEffect(() => {
    if (filtercategories.length > 0) {
      setIsAllCategory(false);
    } else {
      setIsAllCategory(true);
    }
  }, [filtercategories]);

  return (
    <>
      <Breadcrumbs className="absolute z-40 text-gray-200" />
      <div>
        <PageCoverInput
          bild={OmslagsBild}
          rubrik="Leverantörer"
          placeholder="Sök efter leverantörer"
          setSearchString={setSearchString}
        />
        <Container>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-4 sm:gap-8">
            <div className="mb-8 sm:mb-0">
              <Filter
                allCategories={allCategories}
                setFiltercategories={setFiltercategories}
                setIsAllCategory={setIsAllCategory}
                filtercategories={filtercategories}
              />
            </div>
            <div className="col-span-3">
              {filteredAvtal.length ? (
                filteredAvtal.slice(0, postNum).map((item) => {
                  if (
                    !isAllCategory &&
                    item.node.productCategories?.edges
                      .map((item) => item.node.name)
                      .some((category) => filtercategories.includes(category))
                  ) {
                    return (
                      <LeverantorCard
                        key={item.node.id}
                        title={item.node.title}
                        slug={item.node.slug}
                        featuredImage={item.node.featuredImage?.node.sourceUrl}
                        content={item.node.content}
                      />
                    );
                  } else if (isAllCategory) {
                    return (
                      <LeverantorCard
                        key={item.node.id}
                        title={item.node.title}
                        slug={item.node.slug}
                        featuredImage={item.node.featuredImage?.node.sourceUrl}
                        content={item.node.content}
                      />
                    );
                  }
                })
              ) : (
                <p className="text-center">Inga avtal hittades...</p>
              )}
              <LoadmoreButton
                number={postNum}
                setNumber={setPostNum}
                allPosts={allLeverantorer}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allLeverantorer = await getAllLeverantorer();
  const allCategories = await getCategories();
  return { props: { allLeverantorer, allCategories } };
}
