import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  // * Same as DELETE * FROM todo;
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      {
        description: "Naruto shippuden capitulo 120",
      },
      {
        description: "Naruto shippuden capitulo 121",
        completed: true,
      },
      {
        description: "Naruto shippuden capitulo 122",
      },
      {
        description: "Naruto shippuden capitulo 123",
        completed: true,
      },
      {
        description: "Naruto shippuden capitulo 124",
        completed: true,
      },
    ],
  });

  return NextResponse.json({ message: "Seed completed" });
}
