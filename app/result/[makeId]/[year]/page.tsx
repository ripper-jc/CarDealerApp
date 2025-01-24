import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import VehicleModels from '@/components/VehicleModels';

interface ResultPageProps {
  params: {
    makeId: string;
    year: string;
  };
}

export async function generateStaticParams() {
  const makes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetMakesForVehicleType/car?format=json`)
    .then((res) => res.json())
    .then((data) => data.Results);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) =>
    (currentYear - i).toString()
  );

  const params = makes.flatMap((make: { MakeId: number }) =>
    years.map((year) => ({
      makeId: make.MakeId.toString(),
      year,
    }))
  );

  return params;
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { makeId, year } = await params;

  if (isNaN(Number(makeId)) || isNaN(Number(year))) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Vehicle Models</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <VehicleModels makeId={makeId} year={year} />
      </Suspense>
      <Link href="/" className="mt-8">
        <Button>Back to Filter</Button>
      </Link>
    </main>
  );
}
