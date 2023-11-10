import DefaultLayout from '@/components/layout/DefaultLayout';
import dynamic from 'next/dynamic';

const RecommendationMap = dynamic(
  () => import('@/components/feature/recommendation/RecommendationMap'),
  {
    ssr: false,
  }
);

export default function RecommendationPage() {
  return (
    <DefaultLayout header={false} footer={false} className="!p-0">
      <RecommendationMap />
    </DefaultLayout>
  );
}
