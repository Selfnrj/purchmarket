import { TrashIcon } from "@heroicons/react/24/outline";
import { Toaster } from "react-hot-toast";
import AuthContent from "../components/AuthContent";
import AvtalCard from "../components/avtal-card";
import AvtalSparade from "../components/avtal-sparade";
import Container from "../components/container";
import { getAllAvtal } from "../lib/api";

export default function sparadeAvtal(allAvtal) {
  
  return (
    <Container>
      <Toaster />
      <div className="mt-12 mb-8">
        <h1 className="text-7xl font-bold">Sparade avtal</h1>
        <p className="font-semibold leading-8">Här hittar du alla dina sparade avtal.</p>
      </div>
      <AuthContent>
        <AvtalSparade allAvtal={allAvtal} />
      </AuthContent>
    </Container>
  )
}

export async function getStaticProps() {
  const allAvtal = await getAllAvtal();
  return { props: allAvtal };
}