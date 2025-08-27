
// const prisma = new PrismaClient();

// export async function GET() {
//   const items = await prisma.item.findMany({
//     include: {
//       fileData: true,
//     },
//   });

//   return Response.json(items);
// }

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    const items = await prisma.item.findMany({
        include: {
            fileData: true,
        },
    });
    // console.log(items);
    return NextResponse.json(items);
}