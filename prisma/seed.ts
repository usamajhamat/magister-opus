import { PrismaClient } from "@prisma/client";
import { RECOGNITION_COURSES } from "../src/lib/courses";

const prisma = new PrismaClient();

async function main() {
  for (const course of RECOGNITION_COURSES) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {
        title: course.title,
        description: course.description,
        sortOrder: course.sortOrder,
      },
      create: course,
    });
  }

  await prisma.sequence.upsert({
    where: { name: "application" },
    update: {},
    create: { name: "application", value: 0 },
  });

  const year = new Date().getFullYear();
  await prisma.sequence.upsert({
    where: { name: `certificate-${year}` },
    update: {},
    create: { name: `certificate-${year}`, value: 0 },
  });

  console.log(`Seeded ${RECOGNITION_COURSES.length} recognition courses.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
