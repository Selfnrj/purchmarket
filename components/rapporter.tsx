import { gql, useQuery } from "@apollo/client";
import FileDownloader from "./FileDownloader";

const VIEWER = gql`
  query Viewer {
    viewer {
      id
    }
  }
`;

export default function Rapporter({ allRapporter }) {
  const { data, loading, error } = useQuery(VIEWER);

  const id = data?.viewer.id;
  console.log(data?.viewer.id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {allRapporter.edges
        .filter((item) => item.node.rapportUser.kopplaRapport[0].id === id)
        .map(({ node }) => (
          <FileDownloader
            key={node.id}
            title={node.title}
            url={node.file?.pdf?.mediaItemUrl}
            size={node.file?.pdf?.fileSize}
          />
        ))}
    </div>
  );
}
