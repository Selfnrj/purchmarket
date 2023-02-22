import AuthContent from "../components/AuthContent";
import AvtalUtvalda from "../components/avtal-utvalda";
import Breadcrumbs from "../components/Breadcrumbs";
import Container from "../components/container";

export default function MinaAvtal() {
  return (
    <>
      <Breadcrumbs />
      <Container>
        <div>
          <h1 className="my-8 text-6xl font-black leading-tight">Mina Avtal</h1>
          <AuthContent>
            <AvtalUtvalda />
          </AuthContent>
        </div>
      </Container>
    </>
  );
}
