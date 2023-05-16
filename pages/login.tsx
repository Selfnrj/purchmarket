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
        <div className="mx-auto mb-8 grid max-w-6xl grid-cols-1 sm:mt-16 sm:grid-cols-3 sm:gap-8">
          <div className="col-span-2 mb-8 rounded-3xl bg-[#DFEDFF] p-8 sm:mb-0">
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
          <div className=" mx-auto flex max-w-2xl flex-col items-center justify-center rounded-3xl bg-[#FFDCB8] p-8">
            <h1 className="mb-8 text-4xl font-black leading-tight">
              Saknar du konto?
            </h1>
            <p className="leading mb-8 text-center text-xl">
              Fyll i uppgifter nedan för att logga in på ditt konto.
            </p>
            <Link
              className="rounded-full bg-[#17375E] p-4 px-8 font-bold text-white"
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
