import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/games/";

export function getGames() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function createOrUpdateGame(game) {
  return fetch(baseUrl + (game._id || ""), {
    method: game._id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(game)
  })
    .then(handleResponse)
    .catch(handleError);
}
