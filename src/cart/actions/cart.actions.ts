"use client";

import { getCookie, hasCookie, setCookie } from "cookies-next";

type CookieCart = {
  [id: string]: number;
};

export function getCartCookie(): CookieCart {
  if (hasCookie("cart")) {
    const cartCookie = JSON.parse((getCookie("cart") as string) ?? "{}");
    return cartCookie;
  }
  return {};
}

export function addProductToCart(id: string): void {
  const cartCookie = getCartCookie();
  console.log(cartCookie);
  if (cartCookie[id]) {
    cartCookie[id]++;
  } else {
    cartCookie[id] = 1;
  }
  setCookie("cart", JSON.stringify(cartCookie));
}

export function deleteProductFromCart(id: string): void {
  const cartCookie = getCartCookie();
  delete cartCookie[id];
  setCookie("cart", JSON.stringify(cartCookie));
}
