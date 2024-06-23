import axios from "axios";

const API = axios.create({
  baseURL: "https://codeground-backend.onrender.com/compile",
});

const CHAPTERSAPI = axios.create({
  baseURL: "./chapters.json"
});

export const getChapters = async () => {
  const response = await CHAPTERSAPI.get('/');
  return response.data;
};

export const executeCode = async (language: any, sourceCode: any) => {
  if (language !== 'java') {
    throw new Error("Only Java language is supported for local execution");
  }

  const response = await API.post('/java', sourceCode, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });

  return response.data; // Return the plain string output directly
};
