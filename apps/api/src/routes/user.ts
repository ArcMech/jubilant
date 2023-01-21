import { Router, Response } from "express";
import { PrismaClient, User, Prisma } from "database";
import { CreateUserDto } from "../dto";

const userRouter = Router();

const client = new PrismaClient({ errorFormat: "minimal" });

userRouter.get("/", async (_, res) => {
  const users = await client.user.findMany();
  res.send(users);
});

userRouter.post(
  "/",
  async (
    req: { body: CreateUserDto },
    res: Response<User | { error: string }>
  ) => {
    try {
      const newUser = await client.user.create({ data: req.body });
      res.status(201).send(newUser);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientValidationError) {
        res.status(400).send({ error: e.message });
      }
      res.status(400).send({ error: "Bad Request" });
    }
  }
);

module.exports = userRouter;
