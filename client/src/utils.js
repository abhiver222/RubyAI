import { toast } from "react-toastify";

// export const SERVER_URL = "https://rubyai.onrender.com"
export const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://rubyai.onrender.com"
    : "http://localhost:8000";

export const isSome = (val) => val !== null && val !== undefined;

export const isPopulated = (val) => isSome(val) && val.length > 0;

export const sendPostRequest = async (
  url,
  body,
  successMessage,
  errorMessage
) => {
  try {
    console.log("Sending POST request to", url, "with body", body);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.ok) {
      toast.success(successMessage);
      return data;
    } else {
      const { message } = data;
      console.error("Unable to call server", message);
      toast.error(errorMessage);
    }
  } catch (e) {
    console.error("Unable to call server", e);
    toast.error(errorMessage);
  }
  return null;
};
