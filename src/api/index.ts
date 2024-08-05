export const sendEmail = (formData: FormData) => {
  return fetch("https://formsubmit.co/ajax/0a575ddc45deae46842f14e8c019546c", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  });
};
