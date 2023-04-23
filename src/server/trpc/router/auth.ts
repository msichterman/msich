import { router, procedure, authedProcedure } from "../trpc";

export const authRouter = router({
  getSession: procedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: authedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
});
