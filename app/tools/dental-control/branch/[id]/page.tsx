import { BranchCommandCentre } from "@/components/dental-control/BranchCommandCentre";

export default async function BranchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BranchCommandCentre branchId={id} />;
}
