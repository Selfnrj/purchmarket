import { useMutation, gql } from "@apollo/client";

const SEND_PASSWORD_RESET_EMAIL = gql`
  mutation sendPasswordResetEmail($username: String!) {
    sendPasswordResetEmail(input: { username: $username }) {
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
      },
    }).catch((error) => {
      console.error(error);
    });
  }

  if (wasEmailSent) {
    return (
      <p>
        Kontrollera din e-post. En länk för återställning av lösenord har
        skickats till dig.
      </p>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <p className="mb-8">
        Ange e-postadressen som är kopplad till ditt konto så får du en länk för
        att återställa ditt lösenord
      </p>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="password-reset-email">Email</label>
        <input
          id="password-reset-email"
          type="email"
          name="email"
          className="mt-3 mb-8 block w-full rounded-md border border-blue-300 bg-white p-4"
          autoComplete="email"
          required
        />
        {error ? <p className="error-message">{error.message}</p> : null}
        <button
          className="w-full rounded-full bg-[#17375E] p-4 font-bold text-white"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Skickar..."
            : "Skicka e-post för återställning av lösenord"}
        </button>
      </fieldset>
    </form>
  );
}
