import { prisma } from "./db";

export async function addSubscriber(
  email: string,
  locale?: string,
  source?: string
) {
  return prisma.subscriber.upsert({
    where: { email },
    update: { locale, source },
    create: { email, locale, source }
  });
}

export async function listSubscribers() {
  return prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });
}
