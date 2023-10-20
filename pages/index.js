import DefaultLayout from '@/components/layout/DefaultLayout';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/feature/map/map'), {
  ssr: false,
});

export default function MapPage() {
  return (
    <DefaultLayout>
      <Map></Map>
    </DefaultLayout>
  );
}
