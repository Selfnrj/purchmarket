import Container from "../components/container";
import { getAllRapporter, getAllRedigera } from "../lib/api";
import { Tab } from "@headlessui/react";
import useAuth from "../hooks/useAuth";
import RapportLogin from "../components/rapport-login";
import UnAuthContent from "../components/UnAuthContent";
import Rapporter from "../components/rapporter";
import AuthContent from "../components/AuthContent";
import TabLink from "../components/tab-link";
import PageCover from "../components/page-cover";
import Breadcrumbs from "../components/Breadcrumbs";
import { gql, useQuery } from "@apollo/client";
import Loader from "../components/Loader";

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

export default function RapporterPage({ allRapporter }) {
  const { loggedIn } = useAuth();
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
      {loggedIn ? (
        <Container>
          <Tab.Group>
            <div className="flex items-center justify-between border border-transparent border-b-gray-300">
              <TabLink tablinks={["Alla", "2022", "2021"]} />
              <p>Totalt: {totalCount} Rapporter </p>
            </div>
            <Tab.Panels>
              <Tab.Panel>
                <AuthContent>
                  <Rapporter />
                </AuthContent>
              </Tab.Panel>
              <Tab.Panel>2022</Tab.Panel>
              <Tab.Panel>2021</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Container>
      ) : (
        <UnAuthContent>
          <RapportLogin />
        </UnAuthContent>
      )}
    </>
  );
}

export async function getStaticProps() {
  const allRapporter = await getAllRapporter();

  return { props: { allRapporter } };
}
