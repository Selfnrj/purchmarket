import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { Checkbox } from "@mui/material";
import Link from "next/link";

type Props = {
  email: string;
  message: string;
  name: string;
  checkbox: boolean;
};

export default function ContactForm({}: Props) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Props>({
    defaultValues: {
      checkbox: false,
    },
  });
  //const onSubmit: SubmitHandler<Props> = data => console.log(data);
  const [statusMessage, setStatusMessage] = useState<any>();

  const onSubmit: SubmitHandler<Props> = async function onSubmitForm(values) {
    let config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_BASE_URL,
      },
      data: values,
    };

    try {
      const response = await axios(config);
      //console.log(response);
      if (response.status == 200) {
        reset();
        setStatusMessage(
          <p className="mt-4 text-green-500">Meddelande skickat!</p>
        );
      }
    } catch (err) {
      setStatusMessage(
        <p className="mt-4 text-rose-500">
          Det gick inte att skicka meddelandet! Vänligen försök igen senare.
        </p>
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className={`mb-2 block w-full rounded border border-gray-400 p-4 focus:outline-none ${
          errors.name ? "ring-2 ring-red-500" : null
        }`}
        placeholder="Namn"
        {...register("name", { required: true })}
      />
      {errors.name && (
        <span className="mb-4 block text-rose-500">
          Detta fält är obligatoriskt
        </span>
      )}
      <input
        className={`mt-6 mb-2 block w-full rounded border border-gray-400 p-4 focus:outline-none ${
          errors.email ? "ring-2 ring-red-500" : null
        }`}
        placeholder="Email"
        {...register("email", {
          required: true,
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Ange en giltig e-postadress",
          },
        })}
      />
      {errors.email && (
        <span className="mb-4 block text-rose-500">
          Ange en giltig e-postadress
        </span>
      )}
      <textarea
        className={`mt-6 mb-2 block w-full rounded border border-gray-400 p-4 focus:outline-none ${
          errors.message ? "ring-2 ring-red-500" : null
        }`}
        rows={4}
        placeholder="Meddelande"
        {...register("message", { required: true })}
      />
      {errors.message && (
        <span className="mb-4 block text-rose-500">
          Detta fält är obligatoriskt
        </span>
      )}
      <Controller
        name="checkbox"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <label>
            <Checkbox {...field} />
            <span>Jag godkänner härmed Purch</span>{" "}
            <Link className="underline" href="/personuppgiftspolicy">
              personuppgiftspolicy
            </Link>
          </label>
        )}
      />
      {errors.checkbox && (
        <span className="mb-4 block text-rose-500">
          Detta fält är obligatoriskt
        </span>
      )}
      <input
        className="mt-4 w-full cursor-pointer rounded-full bg-[#295080] py-4 px-4 text-white hover:bg-[#17375E]"
        type="submit"
        value="Skicka"
      />
      {statusMessage}
    </form>
  );
}
