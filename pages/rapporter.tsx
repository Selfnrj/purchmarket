import Container from "../components/container";
import { getAllRapporter, getHeroRapporter } from "../lib/api";
import RapportLogin from "../components/rapport-login";
import Rapporter from "../components/rapporter";
import PageCover from "../components/page-cover";
import Breadcrumbs from "../components/Breadcrumbs";
import { useSession } from "next-auth/react";

export default function RapporterPage({ heroRapporter, allRapporter }) {
  const { status } = useSession();

  const { heroText, heroRubrik, heroBild } = heroRapporter.redigera;

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
          <Rapporter allRapporter={allRapporter} />
        </Container>
      ) : (
        <RapportLogin />
      )}
    </>
  );
}

export async function getStaticProps() {
  const allRapporter = await getAllRapporter();
  const heroRapporter = await getHeroRapporter();

  return { props: { allRapporter, heroRapporter }, revalidate: 10 };
}
