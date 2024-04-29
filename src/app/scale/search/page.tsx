import { ScalePageContent } from './content';

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">スケール検索</h2>
      <ScalePageContent />
    </div>
  );
}
