export const encodeFormData = (data) => {
  const formData = new URLSearchParams();

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      formData.append(key, data[key]);
    }
  }

  return formData.toString();
};
