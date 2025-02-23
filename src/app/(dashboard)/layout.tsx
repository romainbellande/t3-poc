import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '~/server/auth';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn',
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/signin');
  }

  return <>{children}</>;
}
