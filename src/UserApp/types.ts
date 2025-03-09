import { Prisma } from "@prisma/client";

export type User = Prisma.UserGetPayload<{
    select: {
        username: true,
        email: true,
        password: true,
        role: true
    }
}>