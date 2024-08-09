const EMAIL_ID = process.env.NEXT_PUBLIC_EMAIL_ID;

export const sendEmail = (formData: FormData) => {
  return fetch(`https://formsubmit.co/ajax/${EMAIL_ID}`, {
    method: "POST",
    body: formData,
  });
};
