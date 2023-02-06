import AuthContent from "../components/AuthContent";
import AvtalUtvalda from "../components/avtal-utvalda";
import Container from "../components/container";
import { getAllAvtal } from "../lib/api";

export default function MinaAvtal(allAvtal) {
  return (
    <Container>
      <div>
        <h1 className="my-8 text-6xl font-black leading-tight">Mina Avtal</h1>
        <AuthContent>
          <AvtalUtvalda />
        </AuthContent>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const allAvtal = await getAllAvtal();
  return { props: allAvtal };
}
