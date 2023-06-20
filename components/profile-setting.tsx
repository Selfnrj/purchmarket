import { useMutation, gql } from "@apollo/client";
import { CheckIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Link from "next/link";

const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $description: String!
  ) {
    updateUser(
      input: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        email: $email
        description: $description
        password: $password
      }
    ) {
      user {
        databaseId
      }
    }
  }
`;

export default function ProfileForm({ viewer }) {
  const { id, firstName, lastName, email, description } = viewer;
  const [updateProfile, { data, loading, error }] = useMutation(UPDATE_PROFILE);
  const wasProfileUpdated = Boolean(data?.updateUser?.user?.databaseId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data);
    updateProfile({
      variables: { id, ...values },
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        {wasProfileUpdated ? (
          <p className="mb-8 flex rounded-md bg-green-500 p-4 text-white">
            <CheckIcon className="mr-2 h-6 w-6" />
            Informationen har uppdaterats.
          </p>
        ) : null}
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="profile-first-name">Förnamn</label>
          <input
            id="profile-first-name"
            type="text"
            name="firstName"
            className="mt-3 mb-3 block w-full rounded-md border border-blue-300 bg-white p-4"
            defaultValue={firstName || ""}
            autoComplete="given-name"
          />
          <label htmlFor="profile-last-name">Eftername</label>
          <input
            id="profile-last-name"
            type="text"
            name="lastName"
            className="mt-3 mb-3 block w-full rounded-md border border-blue-300 bg-white p-4"
            defaultValue={lastName || ""}
            autoComplete="family-name"
          />
          <label htmlFor="profile-email">Email</label>
          <input
            id="profile-email"
            type="email"
            name="email"
            className="mt-3 mb-3 block w-full rounded-md border border-blue-300 bg-white p-4"
            defaultValue={email || ""}
            autoComplete="email"
          />
          <label htmlFor="profile-tel">Telefonnummer</label>
          <input
            id="profile-tel"
            type="text"
            name="description"
            className="mt-3 mb-3 block w-full rounded-md border border-blue-300 bg-white p-4"
            defaultValue={description || ""}
            autoComplete="telefonnummer"
          />
          {error ? <p className="error-message">{error.message}</p> : null}
          <button
            className="mt-4 rounded-full bg-[#17375E] px-16 py-4 font-bold text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sparar..." : "Spara"}
          </button>
        </fieldset>
      </form>
      <button
        className="my-8 block max-w-[240px] rounded-full border border-[#17375E] px-16 py-4 text-center font-bold text-[#17375E]"
        onClick={() => signOut({ callbackUrl: "/glomt-losenord" })}
      >
        Byt lösenord
      </button>
    </>
  );
}
