import { prisma } from "@/lib/prisma";
import { padNumber } from "@/lib/utils";

export async function nextSequence(name: string): Promise<number> {
  const row = await prisma.sequence.upsert({
    where: { name },
    create: { name, value: 1 },
    update: { value: { increment: 1 } },
  });
  return row.value;
}

export async function nextApplicationNumber(): Promise<string> {
  const value = await nextSequence("application");
  return `MO-${padNumber(value)}`;
}

export async function nextCertificateNumber(year: number): Promise<string> {
  const value = await nextSequence(`certificate-${year}`);
  return `MO-${year}-${padNumber(value)}`;
}
