import GrievanceForm from "@/components/GrievanceForm";

export default function GrievancePage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-black text-text-primary">File a Grievance</h1>
        <p className="text-text-muted text-sm mt-0.5">Register a complaint against a government service or scheme</p>
      </div>
      <GrievanceForm />
    </div>
  );
}
