export default function ProfilePage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-text-primary mb-1">Village Profile</h1>
      <p className="text-text-muted text-sm mb-6">Lokmanya Village, Maharashtra</p>
      <div className="card p-6 space-y-4">
        {[["Village Name","Lokmanya Village"],["District","Pune"],["State","Maharashtra"],["Population","1,250"],["Gram Panchayat","Lokmanya GP"],["Block","Haveli"],["Pin Code","411001"]].map(([k,v])=>(
          <div key={k} className="flex justify-between border-b border-surface-border pb-3 last:border-0 last:pb-0">
            <span className="text-sm text-text-muted font-medium">{k}</span>
            <span className="text-sm font-semibold text-text-primary">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
