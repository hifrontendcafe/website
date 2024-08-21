import { filterProfiles } from '@/lib/sanity/profile/filterProfiles';
import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const filters = Object.fromEntries(url.searchParams.entries());

  const technologies = url.searchParams.getAll('technologies') as any;

  const profiles = await filterProfiles(filters, technologies, {
    next: { revalidate: 120 },
  });

  return NextResponse.json(profiles);
}
