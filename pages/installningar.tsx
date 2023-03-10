import { GetStaticProps } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import ProfileForm from "../components/profile-setting";
import { getUser } from "../lib/api";

export default function Installningar({ viewer }) {
  return (
    <>
      <Breadcrumbs />
      <div className="my-16 mx-auto max-w-2xl rounded-3xl bg-[#DFEDFF] p-16">
        <h1 className="mb-8 text-4xl font-black leading-tight">
          Inställningar
        </h1>
        <ProfileForm viewer={viewer} />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const viewer = await getUser();

  return {
    props: { viewer },
    revalidate: 10,
  };
};
