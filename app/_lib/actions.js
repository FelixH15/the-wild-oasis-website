"use server";

import { signIn, signOut } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });

  return signIn;
}

export async function signOutAction() {
  await signOut("google", { redirectTo: "/" });

  return signOut;
}
