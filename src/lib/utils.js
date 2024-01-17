import PocketBase from "pocketbase";
const pb = new PocketBase("https://trening.pockethost.io");

export function isUserLoggedIn() {
  return pb.authStore.isValid;
}

export function getUser() {
  if (pb.authStore.isValid) {
    return pb.authStore.model;
  }

  return null;
}

export function logout() {
  pb.authStore.clear();
}
