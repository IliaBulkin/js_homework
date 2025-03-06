// import { Prisma } from "@prisma/client"

// типы из Prisma берем 
export interface IUser{
    id: number,
    username: string,
    email: string,
    password: string
}

// type User = Prisma.UserGetPayload<{}>!!