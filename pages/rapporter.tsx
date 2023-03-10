import Container from "../components/container";
import { getAllRapporter, getAllRedigera, getUser } from "../lib/api";
import { Tab } from "@headlessui/react";
import RapportLogin from "../components/rapport-login";
import Rapporter from "../components/rapporter";
import TabLink from "../components/tab-link";
import PageCover from "../components/page-cover";
import Breadcrumbs from "../components/Breadcrumbs";
import { gql, useQuery } from "@apollo/client";
import Loader from "../components/Loader";
import { useSession } from "next-auth/react";

const RAPPORTER_QUERY = gql`
  query Rapporter {
    redigera(id: "cG9zdDo0MTM=") {
      id
      redigera {
        heroText
        heroRubrik
        heroBild {
          sourceUrl
        }
      }
    }
  }
`;

export default function RapporterPage({ allRapporter, viewer }) {
  const { status } = useSession();
  const totalCount = allRapporter.edges.length;
  const { data, loading, error } = useQuery(RAPPORTER_QUERY);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const { heroText, heroRubrik, heroBild } = data.redigera.redigera;

  return (
    <>
      <Breadcrumbs className="absolute z-40 text-gray-200" />
      <PageCover
        rubrik={heroRubrik}
        text={heroText}
        bild={heroBild.sourceUrl}
      />
      {status === "authenticated" ? (
        <Container>
          <Tab.Group>
            <div className="flex items-center justify-between border border-transparent border-b-gray-300">
              <TabLink tablinks={["Alla", "2022", "2021"]} />
              <p>Totalt: {totalCount} Rapporter </p>
            </div>
            <Tab.Panels>
              <Tab.Panel>
                <Rapporter viewer={viewer} />
              </Tab.Panel>
              <Tab.Panel>2022</Tab.Panel>
              <Tab.Panel>2021</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Container>
      ) : (
        <RapportLogin />
      )}
    </>
  );
}

export async function getStaticProps() {
  const allRapporter = await getAllRapporter();
  const viewer = await getUser();

  return { props: { allRapporter, viewer } };
}
