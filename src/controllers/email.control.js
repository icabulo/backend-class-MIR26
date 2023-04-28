import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: process.env.TYPE_AUTH,
    user: process.env.USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

export const sendEmail = async (req, res) => {
  try {
    // send mail with defined transport object
    let info = await transporter.sendMail(
      req.body
      /* {
        from: '"Fred Foo 👻" <mariagiraldo4@gmail.com>', // sender address
        to: "ic.slack.v26@gmail.com", // list of receivers
        subject: "First email", // Subject line
        html: "<b>First.....</b>", // html body
      } */
    );

    res.send(info);
  } catch (error) {
    res.status.send(500);
  }
};
