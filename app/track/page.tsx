import ApplicationTracker from "@/components/ApplicationTracker";

export default function TrackPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-black text-text-primary">Track Application</h1>
        <p className="text-text-muted text-sm mt-0.5">Enter your Application ID to check real-time status</p>
      </div>
      <ApplicationTracker />
    </div>
  );
}
