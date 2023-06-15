import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import Loader from "./Loader";

const VIEWER = gql`
  query viewer {
    viewer {
      avatar(size: 400) {
        url
      }
      name
    }
  }
`;

export default function profileInfo() {
  const { data, loading, error } = useQuery(VIEWER);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mt-24 mb-6 flex flex-col items-center">
      <Image
        width={200}
        height={200}
        className="mb-4 rounded-full"
        alt="arrow right"
        src={data.viewer.avatar.url}
      />
      <h2 className="text-4xl font-bold">{data.viewer.name}</h2>
    </div>
  );
}
