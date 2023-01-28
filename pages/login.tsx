import UnAuthContent from "../components/UnAuthContent";
import LogInForm from "../components/LogInForm";
import Container from "../components/container";

export default function LogIn() {
  return (
    <Container>
      <div className="bg-[#DFEDFF] my-16 p-16 rounded-3xl max-w-2xl mx-auto">
        <h1 className="leading-tight mb-2 text-4xl font-black">Välkommen</h1>
        <p className="leading text-xl mb-8">Fyll i uppgifter nedan för att logga in på ditt konto.</p>
        <UnAuthContent>
          <LogInForm />
        </UnAuthContent>
      </div>
    </Container>
  );
}