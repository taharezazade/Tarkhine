export function DefaultProfileAvatar() {
  return "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
}

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
