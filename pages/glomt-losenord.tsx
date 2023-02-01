import SendPasswordResetEmailForm from "../components/SendPasswordResetEmailForm";
import UnAuthContent from "../components/UnAuthContent";

export default function ForgotPassword() {
  return (
    <div className="bg-[#DFEDFF] p-16 my-16 rounded-3xl max-w-2xl mx-auto">
      <h1 className="leading-tight mb-8 text-4xl font-black text-center">Glömt lösenord?</h1>
      <UnAuthContent>
        <SendPasswordResetEmailForm />
      </UnAuthContent>
    </div>
  )
}