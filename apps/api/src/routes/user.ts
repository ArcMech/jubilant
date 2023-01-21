import { Router, Response } from "express";
import { PrismaClient, User, Prisma } from "database";
import { CreateUserDto, UpdateUserDto } from "../dto";

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

userRouter.patch(
  "/:userId/",
  async (
    req: { body: UpdateUserDto; params: { userId: string } },
    res: Response<User | { error: string }>
  ) => {
    const userId = Number(req.params.userId);

    if (typeof userId !== "number") {
      res.status(400).send({ error: "UserId should be a number" });
      return;
    }

    try {
      const user = await client.user.update({
        data: req.body,
        where: {
          id: userId,
        },
      });
      res.status(200).send(user);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientValidationError) {
        res.status(400).send({ error: e.message });
      }

      res.status(400).send({ error: "Bad Request" });
    }
  }
);

userRouter.delete(
  "/:userId/",
  async (req: { params: { userId: string } }, res) => {
    const userId = Number(req.params.userId);

    if (typeof userId !== "number") {
      res.status(400).send({ error: "UserId should be a number" });
      return;
    }

    try {
      await client.user.delete({
        where: {
          id: userId,
        },
      });
      res
        .status(200)
        .send({ message: `User id: ${userId} has been successfully deleted` });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientValidationError) {
        res.status(400).send({ error: e.message });
      }

      res.status(400).send({ error: "Bad Request" });
    }
  }
);

module.exports = userRouter;
