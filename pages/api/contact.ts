import type { NextApiRequest, NextApiResponse } from "next";

const nodemailer = require("nodemailer");

type Data = {
  name: string;
  email: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USER,
      pass: process.env.NEXT_PUBLIC_SMTP_PASS,
    },
  });

  try {
    const emailRes = await transporter.sendMail({
      from: email,
      to: "ambjorn89@gmail.com",
      subject: `Kontakt av ${name} från Purchmarket kontaktformulär`,
      html: `<p><strong>Name: </strong> ${name}</p>
      <p><strong>Email: </strong> ${email}</p>
      <p><strong>Message: </strong> ${message}</p>
      `,
    });
    //console.log("Message Sent");
  } catch (err) {
    //console.log(err);
  }

  res.status(200).json(req.body);
}
