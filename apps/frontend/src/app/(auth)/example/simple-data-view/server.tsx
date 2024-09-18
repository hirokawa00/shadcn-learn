// server.tsx
import { prisma } from '@/lib/prisma';

// 型を推論させる
export async function getServerSideData() {
  return await prisma.user.findMany();
}
