import { ScalePageContent } from './content';

export default function Page() {
  return (
    <div className={'space-y-8 p-4'}>
      <h1 className={'text-xl font-bold'}>Scale</h1>
      <ScalePageContent />
    </div>
  );
}
