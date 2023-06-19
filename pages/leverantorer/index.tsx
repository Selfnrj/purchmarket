import { gql, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Container from "../../components/container";
import Filter from "../../components/Filter";
import LeverantorCard from "../../components/leverantor-card";
import Loader from "../../components/Loader";
import LoadmoreButton from "../../components/loadmore-button";
import PageCoverInput from "../../components/page-coverInput";
import {
  getAllLeverantorer,
  getCategories,
  getHeroLeverantor,
} from "../../lib/api";

export default function Leverantorer({
  allLeverantorer,
  allCategories,
  heroLeverantor,
}) {
  const [filteredAvtal, setFilteredAvtal] = useState(allLeverantorer.edges);
  const [searchString, setSearchString] = useState("");
  const [isAllCategory, setIsAllCategory] = useState(true);
  const [filtercategories, setFiltercategories] = useState([]);
  const [avtalTitles, setAvtalTitles] = useState(
    allLeverantorer.edges.map((item) => item.node.title.toLowerCase())
  );
  const [postNum, setPostNum] = useState(8); // Default number of posts dislplayed

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

  useEffect(() => {
    const storedItems = localStorage.getItem("postNum");
    if (storedItems) {
      setPostNum(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("postNum", JSON.stringify(postNum));
  }, [postNum]);

  useEffect(() => {
    function handleBeforeUnload() {
      localStorage.removeItem("postNum");
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { heroRubrik, heroBild } = heroLeverantor.redigera;

  return (
    <>
      <Breadcrumbs className="absolute z-40 text-gray-200" />
      <div>
        <PageCoverInput
          bild={heroBild.sourceUrl}
          rubrik={heroRubrik}
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
                filteredAvtal
                  .slice(...(isAllCategory ? [0, postNum] : [0, 1000]))
                  .map((item) => {
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
                          featuredImage={
                            item.node.featuredImage?.node.sourceUrl
                          }
                          excerpt={item.node.excerpt}
                        />
                      );
                    } else if (isAllCategory) {
                      return (
                        <LeverantorCard
                          key={item.node.id}
                          title={item.node.title}
                          slug={item.node.slug}
                          featuredImage={
                            item.node.featuredImage?.node.sourceUrl
                          }
                          excerpt={item.node.excerpt}
                        />
                      );
                    }
                  })
              ) : (
                <p className="text-center">Inga leverantörer hittades...</p>
              )}
              {postNum < filteredAvtal.length && isAllCategory ? (
                <LoadmoreButton postNum={postNum} setNumber={setPostNum} />
              ) : null}
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
  const heroLeverantor = await getHeroLeverantor();

  return {
    props: { allLeverantorer, allCategories, heroLeverantor },
    revalidate: 5,
  };
}
