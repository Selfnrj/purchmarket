import UnAuthContent from "../components/UnAuthContent";
import LogInForm from "../components/LogInForm";
import Container from "../components/container";
import Breadcrumbs from "../components/Breadcrumbs";

export default function LogIn() {
  return (
    <>
      <Breadcrumbs />
      <Container>
        <div className="my-16 mx-auto max-w-2xl rounded-3xl bg-[#DFEDFF] p-16">
          <h1 className="mb-2 text-4xl font-black leading-tight">Välkommen</h1>
          <p className="leading mb-8 text-xl">
            Fyll i uppgifter nedan för att logga in på ditt konto.
          </p>
          <UnAuthContent>
            <LogInForm />
          </UnAuthContent>
        </div>
      </Container>
    </>
  );
}
