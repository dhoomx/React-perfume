import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzliMzEwNGMwNjU5MWE0NDU3OWNkOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NzgzMTkyMiwiZXhwIjoxNjU5OTkxOTIyfQ.UA2nQHMhD2k38ckISY9dZ3ZccUPLpYC1v3EL5Ziwmoo";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
