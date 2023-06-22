import Breadcrumbs from "../components/Breadcrumbs";
import ProfileForm from "../components/profile-setting";
import { gql, useQuery } from "@apollo/client";
import Loader from "../components/Loader";

const VIEWER = gql`
  query viewer {
    viewer {
      id
      databaseId
      firstName
      lastName
      email
      description
      capabilities
      avatar(size: 400) {
        url
      }
    }
  }
`;

export default function Installningar() {
  const { data, loading, error } = useQuery(VIEWER);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Breadcrumbs />
      <div className="my-16 mx-auto max-w-2xl bg-[#DFEDFF] p-4 sm:rounded-3xl sm:p-16">
        <h1 className="mb-8 text-4xl font-black leading-tight">
          Inställningar
        </h1>
        <ProfileForm viewer={data.viewer} />
      </div>
    </>
  );
}
