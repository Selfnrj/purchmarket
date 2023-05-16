import Breadcrumbs from "../components/Breadcrumbs";
import SendPasswordResetEmailForm from "../components/SendPasswordResetEmailForm";
import UnAuthContent from "../components/UnAuthContent";

export default function ForgotPassword() {
  return (
    <>
      <Breadcrumbs />
      <div className="my-16 mx-auto max-w-2xl rounded-3xl bg-[#DFEDFF] p-16">
        <h1 className="mb-8 text-center text-4xl font-black leading-tight">
          Glömt lösenord?
        </h1>
        <UnAuthContent>
          <SendPasswordResetEmailForm />
        </UnAuthContent>
      </div>
    </>
  );
}
