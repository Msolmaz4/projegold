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
  } catch (error: unknown) {
    if (error && typeof error === "object" && "text" in error) {
      console.error("Fehler beim Senden der E-Mail:", (error as { text: string }).text);
    } else {
      console.error("Fehler beim Senden der E-Mail:", error);
    }

    alert("Beim Senden der E-Mail ist ein Fehler aufgetreten.");
  }
};

export default SendEmailToUser;
