import { z } from "zod";
import { procedure } from "./_context";
import type { HandleOptsType } from "./_init";

type User = {
  id: string;
  name: string;
  bio?: string;
};
const users: Record<string, User> = {
  a8888888: {
    id: "5e7e051d-6108-43f0-b077-d2cc22879d3b",
    name: "bbb09990",
  },
};

export const getUserByIdInput = z.string();
const getuserByIdHandle = (opts: HandleOptsType<typeof getUserByIdInput>) => {
  return users[opts.input];
};

export const createUserInput = z.object({
  id: z.string().min(1),
  name: z.string().min(3),
  bio: z.string().max(142).optional(),
});
const createUserHandle = (opts: HandleOptsType<typeof createUserInput>) => {
  const user: User = { ...opts.input };
  users[user.id] = user;
  return user;
};

export const userRouter = {
  getUserById: procedure.input(getUserByIdInput).query(getuserByIdHandle),
  createUser: procedure.input(createUserInput).mutation(createUserHandle),
};
