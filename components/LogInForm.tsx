import Link from "next/link";
import { useMutation, gql } from "@apollo/client";

import { GET_USER } from "../hooks/useAuth";

const LOG_IN = gql`
  mutation logIn($login: String!, $password: String!) {
    loginWithCookies(input: { login: $login, password: $password }) {
      status
    }
  }
`;

export default function LogInForm() {
  const [logIn, { loading, error }] = useMutation(LOG_IN, {
    refetchQueries: [{ query: GET_USER }],
  });
  const errorMessage = error?.message || "";
  const isEmailValid =
    !errorMessage.includes("empty_email") &&
    !errorMessage.includes("empty_username") &&
    !errorMessage.includes("invalid_email") &&
    !errorMessage.includes("invalid_username");
  const isPasswordValid =
    !errorMessage.includes("empty_password") &&
    !errorMessage.includes("incorrect_password");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email, password } = Object.fromEntries(data);
    logIn({
      variables: {
        login: email,
        password,
      },
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <div className="mb-8">
          <label htmlFor="log-in-email">Email</label>
          <input
            id="log-in-email"
            type="email"
            name="email"
            autoComplete="username"
            className="mt-3 mb-3 block w-full rounded-md border border-blue-300 bg-white p-4"
            required
          />
          {!isEmailValid ? (
            <p className="text-red-500">
              Ogiltig e-postadress. Var god försök igen.
            </p>
          ) : null}
        </div>
        <div className="mb-8">
          <label htmlFor="log-in-password">Lösenord</label>
          <input
            id="log-in-password"
            type="password"
            name="password"
            autoComplete="current-password"
            className="mt-3 mb-3 block w-full rounded-md border border-blue-300 bg-white p-4"
            required
          />
          {!isPasswordValid ? (
            <p className="mb-3 text-red-500">
              Felaktigt lösenord. Var god försök igen.
            </p>
          ) : null}
          <Link href="/glomt-losenord">Glömt ditt lösenord?</Link>
        </div>

        <button
          className="rounded-full bg-[#17375E] p-4 px-10 font-bold text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loggar in..." : "Logga in"}
        </button>
      </fieldset>
    </form>
  );
}
