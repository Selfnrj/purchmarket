import { gql, useQuery } from "@apollo/client";
import Breadcrumbs from "../components/Breadcrumbs";
import Loader from "../components/Loader";

const VIEWER = gql`
  query viewer {
    viewer {
      kundnummer {
        catell
        juzo
        medema
        mediqSverige
      }
    }
  }
`;

export default function KundNummer() {
  const { data, loading, error } = useQuery(VIEWER);
  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  const { catell, juzo, medema, mediqSverige } = data.viewer.kundnummer;

  return (
    <>
      <Breadcrumbs />
      <div className="mx-auto my-16 max-w-2xl rounded-3xl bg-[#DFEDFF] p-16">
        <h1 className="mb-8 text-center text-4xl font-black leading-tight">
          Kundnummer
        </h1>
        {catell && (
          <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
            <b>Catell</b>
            <span>{catell}</span>
          </div>
        )}
        {juzo && (
          <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
            <b>Juzo</b>
            <span>{juzo}</span>
          </div>
        )}
        {medema && (
          <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
            <b>Medema</b>
            <span>{medema}</span>
          </div>
        )}
        {mediqSverige && (
          <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
            <b>MediqSverige</b>
            <span>{mediqSverige}</span>
          </div>
        )}
      </div>
    </>
  );
}
