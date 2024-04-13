import { z } from "zod";
import { type HandleOptsType } from "./_init";

type User = {
  id: string;
  name: string;
  bio?: string;
};
const users: Record<string, User> = {};

export const getUserByIdInput = z.string();
export const getuserByIdHandle = (
  opts: HandleOptsType<typeof getUserByIdInput>
) => {
  return users[opts.input];
};

export const createUserInput = z.object({
  id: z.string().min(1),
  name: z.string().min(3),
  bio: z.string().max(142).optional(),
});
export const createUserHandle = (
  opts: HandleOptsType<typeof createUserInput>
) => {
  const user: User = { ...opts.input };
  users[user.id] = user;
  return user;
};
