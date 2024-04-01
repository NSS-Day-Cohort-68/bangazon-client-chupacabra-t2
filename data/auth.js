import { fetchWithResponse } from "./fetcher"

export function login(user) {
  return fetchWithResponse("login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
}

export function register(user) {
  return fetchWithResponse("register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
}

export function getUserProfile() {
  const token = localStorage.getItem("token")
  if (!token) {
    // Handle case where token is not available
    return Promise.reject("Token not found in localStorage")
  }
  return fetchWithResponse("profile", {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
}
