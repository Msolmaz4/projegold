// SendEmailToUser.ts
import emailjs from "@emailjs/browser";

const SendEmailToUser = async (
  userEmail: string,
  subject: string,
  body: string
) => {
  const templateParams = {
    to_email: userEmail,
    subject: subject,
    message: body,
  };

  try {
    await emailjs.send(
      "service_cujqktt",
      "template_37k83vh",
      templateParams,
      "rfmiLie3_I9HQT2zo"
    );

    alert("Die E-Mail wurde erfolgreich gesendet!");
  } catch (error: any) {
    console.error("Fehler beim Senden der E-Mail:", error?.text || error);
    alert("Beim Senden der E-Mail ist ein Fehler aufgetreten.");
  }
};

export default SendEmailToUser;
