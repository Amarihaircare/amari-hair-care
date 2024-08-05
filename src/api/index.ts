export const sendEmail = (formData: FormData) => {
  return fetch("https://formsubmit.co/5f07c8c32b01de235ee73e84bd53c09f", {
    method: "POST",
    body: formData,
  });
};
