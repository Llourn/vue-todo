import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { rest } from "msw";
import type { Todo } from "@/types";
import "whatwg-fetch";

const todos: Todo[] = [
  {
    id: 0,
    title: "This is a test todo. Boogers",
    completed: false,
  },
  // ...
];

const todo: Todo = {
  id: 1,
  title: "This is a second test todo",
  completed: false
}

export const restHandlers = [
  rest.get("http://localhost:1337/todos", (req, res, ctx) => {
    console.log(ctx.json(JSON.stringify(todos)));
    return res(ctx.status(200), ctx.json(todos));
  }),
  rest.post("http://localhost:1337/todos", (req, res, ctx) => {
    return res(
      ctx.json({
        id: Math.random(),
        title: "💥",
        completed: false
      })
    )
  })
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
