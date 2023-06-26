import { useQuery } from "@apollo/client";
import { RAPPORTER } from "../lib/getRapporter";
import FileDownloader from "./FileDownloader";
import Loader from "./Loader";

export default function Rapporter({ viewer }) {

  const { data, loading, error } = useQuery(RAPPORTER);
  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const filteredRapporter = data.allRapporter.edges.filter((item) =>
  item.node.rapportUser.kopplaRapport !== null); 


  const filteredRapporterId = filteredRapporter.filter((item) =>
  item.node.rapportUser.kopplaRapport.some((item) => item.id === viewer)
  );

  console.log(filteredRapporterId);

  console.log(viewer);


  return (
    <div>
      {filteredRapporterId.length > 0 ? (
        filteredRapporterId
        .map(({ node }) => (
          <FileDownloader
            key={node.id}
            title={node.title}
            url={node.file?.pdf?.mediaItemUrl}
            size={node.file?.pdf?.fileSize}
          />
        ))
      ) : (
        <p className="text-center p-8">Inga rapporter att visa</p>
      )}
    </div>
  );
}
