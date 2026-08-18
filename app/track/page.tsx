import ApplicationTracker from "@/components/ApplicationTracker";

export default function TrackPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      <h1 className="text-xl font-black text-kriya-indigo-dark mb-1">Track Application</h1>
      <p className="text-sm text-kriya-warm-gray mb-5">Enter your Application ID to check real-time status.</p>
      <ApplicationTracker />
    </div>
  );
}
