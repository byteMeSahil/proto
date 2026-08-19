import AIChatBot from "@/components/dashboard/AIChatBot";

export default function ChatPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto h-[calc(100vh-80px)]">
      <div className="mb-4">
        <h1 className="text-2xl font-black text-text-primary">AI Chat Bot</h1>
        <p className="text-text-muted text-sm mt-0.5">Ask anything about government services, schemes, and documents</p>
      </div>
      <div style={{ height: "calc(100vh - 180px)" }}>
        <AIChatBot />
      </div>
    </div>
  );
}
