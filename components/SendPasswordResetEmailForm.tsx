import { useMutation, gql } from "@apollo/client";

const SEND_PASSWORD_RESET_EMAIL = gql`
  mutation sendPasswordResetEmail($username: String!) {
    sendPasswordResetEmail(
      input: { username: $username }
    ) {
      user {
        databaseId
      }
    }
  }
`;

export default function SendPasswordResetEmailForm() {
  const [sendPasswordResetEmail, { loading, error, data }] = useMutation(
    SEND_PASSWORD_RESET_EMAIL
  );
  const wasEmailSent = Boolean(data?.sendPasswordResetEmail?.user?.databaseId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email } = Object.fromEntries(data);
    sendPasswordResetEmail({
      variables: {
        username: email,
      }
    }).catch(error => {
      console.error(error);
    });
  }

  if (wasEmailSent) {
    return (
      <p> Please check your email. A password reset link has been sent to you.</p>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <p className="mb-8">
        Ange e-postadressen som är kopplad till ditt konto så får du en länk för att återställa ditt lösenord
      </p>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="password-reset-email">Email</label>
        <input
          id="password-reset-email"
          type="email"
          name="email"
          className="p-4 mt-3 mb-8 rounded-md block w-full bg-white border border-blue-300"
          autoComplete="email"
          required
        />
        {error ? (
          <p className="error-message">{error.message}</p>
        ) : null}
        <button className="w-full font-bold p-4 bg-[#17375E] rounded-full text-white" type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send password reset email'}
        </button>
      </fieldset>
    </form>
  );
}