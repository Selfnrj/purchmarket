import Image from "next/image";
import PDFIcon from '../public/PDF.svg'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import useAuth, { User } from "../hooks/useAuth";
import { gql, useQuery } from "@apollo/client";
import FileDownloader from "./FileDownloader";

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

export default function Rapporter() {
  const { data, loading, error } = useQuery(RAPPORT_QUERY);
  const { user } = useAuth();
  const { id } = user as User;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const allRapporter = data.allRapporter.edges;

  //console.log(allRapporter);

  return (
    <div>
      {allRapporter.filter(item => item.node.rapportUser.kopplaRapport[0].id === id).map(({ node }) => (
        <FileDownloader 
          key={node.id}
          title={node.file?.pdf?.title}
          url={`https://purchwp.azurewebsites.net/${node.file?.pdf?.mediaItemUrl}`}
          size={node.file?.pdf?.fileSize}
        />
      ))}
    </div>
  )
}