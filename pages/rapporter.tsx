import Container from "../components/container";
import { getAllRapporter, getHeroRapporter } from "../lib/api";
import useAuth from "../hooks/useAuth";
import RapportLogin from "../components/rapport-login";
import UnAuthContent from "../components/UnAuthContent";
import Rapporter from "../components/rapporter";
import AuthContent from "../components/AuthContent";
import PageCover from "../components/page-cover";
import Breadcrumbs from "../components/Breadcrumbs";

export default function RapporterPage({ allRapporter, heroRapporter }) {
  const { loggedIn } = useAuth();

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
      {loggedIn ? (
        <Container>
          <AuthContent>
            <Rapporter />
          </AuthContent>
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
  const heroRapporter = await getHeroRapporter();

  return { props: { allRapporter, heroRapporter } };
}
