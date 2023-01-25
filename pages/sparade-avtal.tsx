import Container from "../components/container";
import Header from "../components/header";
import Layout from "../components/layout";

export default function sparadeAvtal() {
  return (
    <Layout>
        <Header />
        <Container>
          <div className="mt-12 mb-8">
            <h1 className="text-7xl font-bold">Sparade avtal</h1>
            <p className="font-semibold leading-8">Här hittar du alla dina sparade avtal.</p>
          </div>
        </Container>
      </Layout>
  )
}

