import { useQuery } from "@apollo/client";
import { RAPPORTER } from "../lib/getRapporter";
import FileDownloader from "./FileDownloader";
import Loader from "./Loader";

export default function Rapporter({ viewer }) {
  const id = viewer;

  const { data, loading, error } = useQuery(RAPPORTER);
  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.allRapporter.edges
        .filter((item) => item.node.rapportUser?.kopplaRapport[0].id === id)
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
