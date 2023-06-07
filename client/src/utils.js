export const SERVER_URL = "https://rubyai.onrender.com"

export const isSome = (val) => val !== null && val !== undefined

export const isPopulated = (val) => isSome(val) && val.length > 0