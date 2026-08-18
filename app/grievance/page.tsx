import GrievanceForm from "@/components/GrievanceForm";

export default function GrievancePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      <h1 className="text-xl font-black text-kriya-indigo-dark mb-1">File a Grievance</h1>
      <p className="text-sm text-kriya-warm-gray mb-5">Register a complaint against a government service or scheme.</p>
      <GrievanceForm />
    </div>
  );
}
