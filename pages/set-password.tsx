import { useRouter } from "next/router";
import SetPasswordForm from "../components/SetPasswordForm";

export default function SetPassword() {
  const router = useRouter();
  const resetKey = String(router.query.key || "");
  const login = String(router.query.login || "");

  return (
    <div className="mx-auto mt-16 mb-8 max-w-2xl rounded-3xl bg-[#DFEDFF] p-16">
      <h1 className="mb-6 text-4xl font-black leading-tight">Välj lösenord</h1>
      <SetPasswordForm resetKey={resetKey} login={login} />
    </div>
  );
}
