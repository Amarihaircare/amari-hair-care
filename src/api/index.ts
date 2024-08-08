export const sendEmail = (formData: FormData) => {
  return fetch("https://formsubmit.co/ajax/wholesale@amarihaircare.com", {
    method: "POST",
    body: formData,
  });
};
