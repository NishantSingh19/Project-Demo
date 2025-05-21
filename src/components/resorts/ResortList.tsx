import type { Resort } from '@/lib/types';
import ResortCard from './ResortCard';

type ResortListProps = {
  resorts: Resort[];
  title?: string;
};

export default function ResortList({ resorts, title = "Discover Our Resorts" }: ResortListProps) {
  if (resorts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-muted-foreground">No resorts found.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {resorts.map((resort) => (
          <ResortCard key={resort.id} resort={resort} />
        ))}
      </div>
    </div>
  );
}
