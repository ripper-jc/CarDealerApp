import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VehicleModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

async function getVehicleModels(
  makeId: string,
  year: string
): Promise<VehicleModel[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch vehicle models');
  }
  const data = await res.json();
  return data.Results;
}

export default async function VehicleModels({
  makeId,
  year,
}: {
  makeId: string;
  year: string;
}) {
  let models: VehicleModel[];
  try {
    models = await getVehicleModels(makeId, year);
  } catch {
    return <div>Error: Failed to load vehicle models</div>;
  }

  if (models.length === 0) {
    return <div>No models found for the selected make and year.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {models.map((model) => (
        <Card key={model.Model_ID}>
          <CardHeader>
            <CardTitle>{model.Model_Name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Make: {model.Make_Name}</p>
            <p>Year: {year}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}