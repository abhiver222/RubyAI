// export const SERVER_URL = "https://rubyai.onrender.com"
export const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://rubyai.onrender.com"
    : "http://localhost:8000";

export const isSome = (val) => val !== null && val !== undefined;

export const isPopulated = (val) => isSome(val) && val.length > 0;
