import Image from "next/image";
import Container from "../../../components/container";
import { getAllAvtal, getAvtal } from "../../../lib/api";
import FileDownloader from '../../../components/FileDownloader'
import { filesize } from "filesize";
import Link from "next/link";
import arrowRight from '../../../public/arrow-right.svg'
import useAuth from "../../../hooks/useAuth";

export default function AvtalDetail(avtal) {
  //const size = filesize(avtal.avtalPdf?.pdf?.fileSize);
  const { loggedIn } = useAuth();
  
  return (
    <>
    <div className="relative flex items-end h-96 w-full mb-8">
      <Image
        fill
        alt={avtal.title}
        src={`https://purchwp.azurewebsites.net/${avtal.featuredImage?.node.sourceUrl}`}
        className="object-cover object-center"
      />
      <div className="bg-black bg-opacity-50 z-40 w-full pb-6 pt-12 text-white relative">
        <Container>
          <div className="flex">
            {/* <p className="mr-1">{avtal.author?.node.firstName}</p> */}
            {avtal.categories?.edges.map(({ node }) => (
              <p className="relative mr-1" key={node.id}>{node.name} </p>
            ))}
          </div>
          
          <h1 className="text-6xl font-bold mb-4 relative">{avtal.title}</h1> 
        </Container>
      </div>
    </div>
    <Container>
      <h2 className="text-4xl font-bold mb-4">Om avtalet</h2>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="mb-8" dangerouslySetInnerHTML={{ __html: avtal.content }} />
          {loggedIn ? (
            <Link href="/kundnummer" className="flex items-center font-bold text-[#17375E]">
              Se mina kundnummer
              <Image 
                width={40}
                height={14}
                className="ml-4"
                alt="arrow right"
                src={arrowRight} />
            </Link>
          ) : (
            ""
          )}
          { avtal.file?.pdf?.title &&
            <div className="border border-transparent mt-8 border-t-gray-300">
              <FileDownloader 
                title={avtal.file?.pdf?.title}
                url={avtal.file?.pdf?.mediaItemUrl}
                size={avtal.file?.pdf?.fileSize}
              />
            </div>
          }
        </div>
        <div>
          <div className="bg-[#DFEDFF] rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4">Kontakt</h3>
            <ul className="flex flex-wrap">
              <li className="mr-8 py-2 w-6/12">Namn:</li>
              <li className="font-semibold py-2">{avtal.avtalsinfo?.namn}</li>
              <li className="mr-8 w-6/12 py-2">Telefonnummer:</li>
              <li className="font-semibold py-2">{avtal.avtalsinfo?.telefonnummer}</li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
    </>
  )
}

export async function getStaticProps({ params }) {
  const avtal = await getAvtal(params.slug);

  return { props: avtal };
}

export async function getStaticPaths() {
  const avtalWithSlugs = await getAllAvtal();
  return {
    paths: avtalWithSlugs.edges.map(({ node }) => `/avtal/${node.slug}`) || [],
    fallback: true,
  };
}
