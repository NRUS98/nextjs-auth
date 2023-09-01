export const getFormData = <T>(form: HTMLFormElement): T => {
  const formData = new FormData(form);

  let data: Record<string, any> = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  return data as T;
};
