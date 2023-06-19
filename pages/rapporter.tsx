import Container from "../components/container";
import { getHeroRapporter } from "../lib/api";
import RapportLogin from "../components/rapport-login";
import Rapporter from "../components/rapporter";
import PageCover from "../components/page-cover";
import Breadcrumbs from "../components/Breadcrumbs";
import { useSession } from "next-auth/react";
import { gql, useQuery } from "@apollo/client";
import Loader from "../components/Loader";

const VIEWER = gql`
  query Viewer {
    viewer {
      id
    }
  }
`;

export default function RapporterPage({ heroRapporter }) {
  const { status } = useSession();

  const { heroText, heroRubrik, heroBild } = heroRapporter.redigera;

  const { data, loading, error } = useQuery(VIEWER);
  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Breadcrumbs className="absolute z-40 text-gray-200" />
      <PageCover
        rubrik={heroRubrik}
        text={heroText}
        bild={heroBild.sourceUrl}
        type={heroBild.mediaType}
      />
      {status === "authenticated" ? (
        <Container>
          <Rapporter viewer={data.viewer.id} />
        </Container>
      ) : (
        <RapportLogin />
      )}
    </>
  );
}

export async function getStaticProps() {
  const heroRapporter = await getHeroRapporter();

  return { props: { heroRapporter }, revalidate: 10 };
}
