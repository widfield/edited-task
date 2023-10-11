// src/mocks/handlers.js
import { rest } from "msw";

const users = [
  {
    username: "hello@edited.com",
    password: "hello123",
  },
];

export const handlers = [
  rest.post("/login", async (req, res, ctx) => {
    const { username, password } = await req.json();
    sessionStorage.setItem("is-authenticated", "true");
    sessionStorage.setItem("username", username);
    const user = users.find((e) => e.username === username);

    return res(user?.password === password ? ctx.status(200) : ctx.status(401));
  }),
  rest.get("/user", (req, res, ctx) => {
    const isLoggedIn = sessionStorage.getItem("is-authenticated");
    const username = sessionStorage.getItem("username");
    return res(
      ctx.json({
        username,
        isLoggedIn: Boolean(isLoggedIn),
      })
    );
  }),
  rest.get("/logout", (req, res, ctx) => {
    sessionStorage.removeItem("is-authenticated");
    sessionStorage.removeItem("username");
    return res(ctx.status(200));
  }),
];
