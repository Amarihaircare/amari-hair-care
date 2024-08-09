export const sendEmail = (formData: FormData) => {
  return fetch("https://formsubmit.co/ajax/0a575ddc45deae46842f14e8c019546c", {
    method: "POST",
    body: formData,
  });
};

// export const sendEmail = (formData: FormData) => {
//   return fetch("https://formsubmit.co/ajax/support@amarihaircare.com", {
//     method: "POST",
//     body: formData,
//   });
// };
