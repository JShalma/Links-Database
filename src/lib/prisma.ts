/* Store one PrismaClient for fetching data so that the pages reloading will not create an abundance of PrismaClients  */

// database client based on our schema model
// provides an API to interact with our database
import { PrismaClient } from "@prisma/client";

// the client might exist or not yet
declare global {
    var prisma: PrismaClient | undefined;
};
// undefined -> then make a new PrismaClient (which also tells us if there is any warning or error)
export const prisma = 
    global.prisma ?? new PrismaClient({
        log: ["warn", "error"]
    });

// set global to contain PrismaClient
if (process.env.NODE_ENV != "production") global.prisma = prisma;