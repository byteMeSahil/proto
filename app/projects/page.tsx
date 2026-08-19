import DevelopmentProjects from "@/components/dashboard/DevelopmentProjects";

export default function ProjectsPage() {
  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-black text-text-primary">Village Development Projects</h1>
        <p className="text-text-muted text-sm mt-0.5">Track all ongoing infrastructure and development work</p>
      </div>
      <DevelopmentProjects />
    </div>
  );
}
