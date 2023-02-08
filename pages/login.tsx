import UnAuthContent from "../components/UnAuthContent";
import LogInForm from "../components/LogInForm";
import Container from "../components/container";
import Breadcrumbs from "../components/Breadcrumbs";
import Link from "next/link";

export default function LogIn() {
  return (
    <>
      <Breadcrumbs />
      <Container>
        <div className="mx-auto mt-16 mb-8 grid max-w-6xl grid-cols-3 gap-8">
          <div className="col-span-2 rounded-3xl bg-[#DFEDFF] p-8">
            <h1 className="mb-2 text-4xl font-black leading-tight">
              Välkommen
            </h1>
            <p className="leading mb-8 text-xl">
              Fyll i uppgifter nedan för att logga in på ditt konto.
            </p>
            <UnAuthContent>
              <LogInForm />
            </UnAuthContent>
          </div>
          <div className="mx-auto max-w-2xl rounded-3xl bg-[#FFDCB8] p-8">
            <h1 className="mb-2 text-4xl font-black leading-tight">
              Saknar du konto?
            </h1>
            <p className="leading mb-8 text-xl">
              Fyll i uppgifter nedan för att logga in på ditt konto.
            </p>
            <Link
              className="w-full rounded-full bg-[#17375E] p-4 px-8 font-bold text-white"
              href="/kontakta-oss"
            >
              Kontakta oss
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
