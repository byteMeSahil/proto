export default function SettingsPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-text-primary mb-1">Settings</h1>
      <p className="text-text-muted text-sm mb-6">Manage your Kriya preferences</p>
      <div className="card p-6 space-y-5">
        {[
          { label: "Language", value: "English", note: "10 languages supported" },
          { label: "Notifications", value: "Enabled", note: "Push and SMS alerts" },
          { label: "Offline Mode", value: "Active", note: "Core data cached locally" },
          { label: "Data Source", value: "Official GoI Portals", note: "Last synced: today" },
        ].map(s => (
          <div key={s.label} className="flex items-center justify-between border-b border-surface-border pb-5 last:border-0 last:pb-0">
            <div>
              <p className="text-sm font-semibold text-text-primary">{s.label}</p>
              <p className="text-xs text-text-muted mt-0.5">{s.note}</p>
            </div>
            <span className="badge badge-green">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
