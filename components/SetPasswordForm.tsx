import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Link from "next/link";

const RESET_PASSWORD = gql`
  mutation resetUserPassword(
    $key: String!
    $login: String!
    $password: String!
  ) {
    resetUserPassword(
      input: { key: $key, login: $login, password: $password }
    ) {
      user {
        databaseId
      }
    }
  }
`;

interface Props {
  resetKey: string;
  login: string;
}

export default function SetPasswordForm({ resetKey: key, login }: Props) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [clientErrorMessage, setClientErrorMessage] = useState("");
  const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD);
  const wasPasswordReset = Boolean(data?.resetUserPassword?.user?.databaseId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    resetPassword({
      variables: {
        key,
        login,
        password,
      },
    }).catch((error) => {
      console.error(error);
    });
  }

  function validate() {
    setClientErrorMessage("");

    const isPasswordLongEnough = password.length >= 5;
    if (!isPasswordLongEnough) {
      setClientErrorMessage("Lösenordet måste vara minst 5 tecken.");
      return false;
    }

    const doPasswordsMatch = password === passwordConfirm;
    if (!doPasswordsMatch) {
      setClientErrorMessage("Passwords must match.");
      return false;
    }

    return true;
  }

  if (wasPasswordReset) {
    return (
      <>
        <p className="leading-16 mb-8 font-semibold">
          Ditt nya lösenord har ställts in
        </p>
        <div>
          <Link
            className="w-full rounded-full bg-[#17375E] p-4 font-bold text-white"
            href="/login"
          >
            Logga in
          </Link>
        </div>
      </>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="new-password">Password</label>
        <input
          id="new-password"
          type="password"
          className="mt-3 mb-3 block w-full rounded-md border border-blue-300 bg-white p-4"
          value={password}
          autoComplete="new-password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <label htmlFor="password-confirm">Confirm Password</label>
        <input
          id="password-confirm"
          type="password"
          className="mt-3 mb-3 block w-full rounded-md border border-blue-300 bg-white p-4"
          value={passwordConfirm}
          autoComplete="new-password"
          onChange={(event) => setPasswordConfirm(event.target.value)}
          required
        />
        {clientErrorMessage ? (
          <p className="mb-4 block text-rose-500">{clientErrorMessage}</p>
        ) : null}
        {error ? (
          <p className="mb-4 block text-rose-500">{error.message}</p>
        ) : null}
        <button
          className="mt-4 w-full rounded-full bg-[#17375E] p-4 font-bold text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save password"}
        </button>
      </fieldset>
    </form>
  );
}
