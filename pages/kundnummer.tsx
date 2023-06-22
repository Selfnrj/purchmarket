import { gql, useQuery } from "@apollo/client";
import Breadcrumbs from "../components/Breadcrumbs";
import Loader from "../components/Loader";
import Container from "../components/container";

const VIEWER = gql`
  query viewer {
    viewer {
      kundnummer {
        ajProdukter
        arjo
        atta45
        bard
        bixia
        catell
        convini
        dibTravel
        ekopost
        elgiganten
        etac
        hartmann
        hejco
        hlrKonsulten
        inkclub
        inputInterior
        interflora
        labteamet
        lojer
        magnussonFreij
        mathem
        medelaMedical
        medema
        onemedSverige
        rekomo
        rts
        rydens
        sakra
        securitasDirect
        sj
        sjobloms
        synlab
        synoptik
        telness
        tgInstrument
        vingmed
      }
    }
  }
`;

export default function KundNummer() {
  const { data, loading, error } = useQuery(VIEWER);
  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  const {
    ajProdukter,
    arjo,
    atta45,
    bard,
    bixia,
    catell,
    convini,
    dibTravel,
    ekopost,
    elgiganten,
    etac,
    hartmann,
    hejco,
    hlrKonsulten,
    inkclub,
    inputInterior,
    interflora,
    labteamet,
    lojer,
    magnussonFreij,
    mathem,
    medelaMedical,
    medema,
    onemedSverige,
    rekomo,
    rts,
    rydens,
    sakra,
    securitasDirect,
    sj,
    sjobloms,
    synlab,
    synoptik,
    telness,
    tgInstrument,
    vingmed,
  } = data.viewer.kundnummer;

  console.log(data.viewer.kundnummer);

  return (
    <>
      <Breadcrumbs />
      <Container>
        <div className="mx-auto my-16 max-w-2xl rounded-3xl bg-[#DFEDFF] p-16">
          <h1 className="mb-8 text-center text-4xl font-black leading-tight">
            Kundnummer
          </h1>
          {ajProdukter && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>AJ Produkter</b>
              <span>{ajProdukter}</span>
            </div>
          )}
          {arjo && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Arjo</b>
              <span>{arjo}</span>
            </div>
          )}
          {atta45 && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Åtta 45</b>
              <span>{atta45}</span>
            </div>
          )}
          {bard && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Bard</b>
              <span>{bard}</span>
            </div>
          )}
          {bixia && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Bixia</b>
              <span>{bixia}</span>
            </div>
          )}
          {catell && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Catell</b>
              <span>{catell}</span>
            </div>
          )}
          {convini && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Convini</b>
              <span>{convini}</span>
            </div>
          )}
          {dibTravel && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>DIB Travel</b>
              <span>{dibTravel}</span>
            </div>
          )}
          {ekopost && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Ekopost</b>
              <span>{ekopost}</span>
            </div>
          )}
          {elgiganten && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Elgiganten</b>
              <span>{elgiganten}</span>
            </div>
          )}
          {etac && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Etac</b>
              <span>{etac}</span>
            </div>
          )}
          {hartmann && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Hartmann</b>
              <span>{hartmann}</span>
            </div>
          )}
          {hejco && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Hejco</b>
              <span>{hejco}</span>
            </div>
          )}
          {hlrKonsulten && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>HLR Konsulten</b>
              <span>{hlrKonsulten}</span>
            </div>
          )}
          {inkclub && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Inkclub</b>
              <span>{inkclub}</span>
            </div>
          )}
          {inputInterior && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Input Interior</b>
              <span>{inputInterior}</span>
            </div>
          )}
          {interflora && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Interflora</b>
              <span>{interflora}</span>
            </div>
          )}
          {labteamet && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Labteamet</b>
              <span>{labteamet}</span>
            </div>
          )}
          {lojer && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Lojer</b>
              <span>{lojer}</span>
            </div>
          )}
          {magnussonFreij && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Magnusson Freij</b>
              <span>{magnussonFreij}</span>
            </div>
          )}
          {mathem && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Mathem</b>
              <span>{mathem}</span>
            </div>
          )}
          {medelaMedical && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Medela Medical</b>
              <span>{medelaMedical}</span>
            </div>
          )}
          {medema && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Medema</b>
              <span>{medema}</span>
            </div>
          )}
          {onemedSverige && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>OneMed Sverige</b>
              <span>{onemedSverige}</span>
            </div>
          )}
          {rekomo && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Rekomo</b>
              <span>{rekomo}</span>
            </div>
          )}
          {rts && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Rts</b>
              <span>{rts}</span>
            </div>
          )}
          {rydens && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Rydens</b>
              <span>{rydens}</span>
            </div>
          )}
          {sakra && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Säkra</b>
              <span>{sakra}</span>
            </div>
          )}
          {securitasDirect && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Securitas Direct</b>
              <span>{securitasDirect}</span>
            </div>
          )}
          {sj && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Sj</b>
              <span>{sj}</span>
            </div>
          )}
          {sjobloms && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Sjöbloms</b>
              <span>{sjobloms}</span>
            </div>
          )}
          {synlab && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Synlab</b>
              <span>{synlab}</span>
            </div>
          )}
          {synoptik && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Synoptik</b>
              <span>{synoptik}</span>
            </div>
          )}
          {telness && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Telness</b>
              <span>{telness}</span>
            </div>
          )}
          {tgInstrument && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>TG Instrument</b>
              <span>{tgInstrument}</span>
            </div>
          )}
          {vingmed && (
            <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
              <b>Vingmed</b>
              <span>{vingmed}</span>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
