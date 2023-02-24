const API_ROOT = "http://localhost:3000";

type methodType = "GET" | "POST" | "PUT" | "DELETE";

export const fetcher = async (
  url: URL | string,
  method: methodType = "GET",
  body: {} | null = null
) => {
  try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(`${API_ROOT}${url}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};
