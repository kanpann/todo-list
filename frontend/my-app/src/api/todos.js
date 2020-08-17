import axios from "axios";

const BASE_API_URI = "/api/todo";

export const deleteTodo = async (jwtToken, id) => {
  const response = await axios.delete(`${BASE_API_URI}/${id}`, {
    headers: { Authorization: jwtToken },
  });
  return response.status;
};
export const getTodos = async (jwtToken) => {
  const response = await axios.get(`${BASE_API_URI}/list`, {
    headers: { Authorization: jwtToken },
  });
  return response.data;
};
export const createTodo = async (jwtToken, text) => {
  const response = await axios.post(
    BASE_API_URI,
    { text: text },
    {
      headers: { Authorization: jwtToken },
    }
  );
  return response.status;
};
export const setReverseCheckTodo = async (jwtToken, id) => {
  const response = await axios.put(`${BASE_API_URI}/${id}`, null, {
    headers: { Authorization: jwtToken },
  });
  return response.status;
};
