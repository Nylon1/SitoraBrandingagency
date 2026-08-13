import { ClinicianProfile } from "@/components/dental-control/ClinicianProfile";

export default async function ClinicianPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ClinicianProfile clinicianId={id} />;
}
