import AuthContent from "../components/AuthContent";
import Breadcrumbs from "../components/Breadcrumbs";
import ProfileForm from "../components/profile-setting";

export default function Installningar() {
  return (
    <AuthContent>
      <Breadcrumbs />
      <div className="my-16 mx-auto max-w-2xl rounded-3xl bg-[#DFEDFF] p-16">
        <h1 className="mb-8 text-4xl font-black leading-tight">
          Inställningar
        </h1>
        <ProfileForm />
      </div>
    </AuthContent>
  );
}
