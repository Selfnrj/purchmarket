import Image from "next/image";
import PDFIcon from '../public/PDF.svg'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import useAuth, { User } from "../hooks/useAuth";
import { gql, useQuery } from "@apollo/client";

const RAPPORT_QUERY = gql`
  query Rapporter {
    allRapporter {
      edges {
        node {
          file {
            pdf {
              fileSize
              mediaItemUrl
              title
            }
          }
          title
          id
          rapportUser {
            kopplaRapport {
              id
            }
          }
        }
      }
    }
  }
`;

export default function FileDownloader() {
  const { data, loading, error } = useQuery(RAPPORT_QUERY);
  const { user } = useAuth();
  const { id } = user as User;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const allRapporter = data.allRapporter.edges;

  console.log(allRapporter);

  return (
    <div>
      {allRapporter.filter(item => item.node.rapportUser.kopplaRapport[0].id === id).map(({ node }) => (
        <div key={node.id} className="flex items-center justify-between border border-transparent border-b-gray-300 p-4">
          <div className="flex items-center">
            <a href={node.url} target="_blank">
              <Image
                className="mr-4"
                height={40}
                width={40}
                alt="pdf icon"
                src={PDFIcon}
              />
            </a>
            <a className="mr-48" href={`https://purchwp.azurewebsites.net/${node.file.pdf.mediaItemUrl}`} target="_blank">
              <b>{node.title}</b>
            </a>
            {node.size}
          </div>
          <a className="flex items-center" href={`https://purchwp.azurewebsites.net/${node.file.pdf.mediaItemUrl}`} target="_blank" download>
            <ArrowDownTrayIcon className="h-6 w-6 mr-2"/>
            Ladda ner
          </a>
        </div>
      ))}
    </div>
  )
}