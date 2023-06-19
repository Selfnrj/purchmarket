import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";

export default function LogInForm() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { data: session } = useSession();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);

    const res = await signIn("wp-graphql", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    }).then(({ ok, error }) => {
      if (ok) {
        router.push("/mina-sidor");
      } else {
        toast.error(
          "Ogiltig e-postadress eller lösenord. Var god försök igen."
        );
        setIsSigningIn(false);
      }
    });
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <Toaster />
      <fieldset>
        <div className="mb-8">
          <label htmlFor="log-in-email">Email</label>
          <input
            id="log-in-email"
            type="email"
            name="email"
            autoComplete="username"
            className="mt-3 mb-3 block w-full rounded-md border border-blue-300 bg-white p-4"
            required
            value={userInfo.email}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, email: target.value })
            }
          />
        </div>
        <div className="mb-8">
          <label htmlFor="log-in-password">Lösenord</label>
          <input
            id="log-in-password"
            type="password"
            name="password"
            autoComplete="current-password"
            className="mt-3 mb-3 block w-full rounded-md border border-blue-300 bg-white p-4"
            value={userInfo.password}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, password: target.value })
            }
            required
          />
          <Link className="hover:underline" href="/glomt-losenord">
            Glömt ditt lösenord?
          </Link>
        </div>

        <button
          className="rounded-full bg-[#17375E] p-4 px-10 font-bold text-white"
          type="submit"
        >
          {isSigningIn ? "Loggar in..." : "Logga in"}
        </button>
      </fieldset>
    </form>
  );
}
