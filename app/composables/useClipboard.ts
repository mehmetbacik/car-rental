export const useClipboard = () => {
  const copied = ref("");

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);

    copied.value = key;

    setTimeout(() => {
      copied.value = "";
    }, 1500);
  };

  return {
    copied,
    copy,
  };
};
