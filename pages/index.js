import AddSensorModal from '@/components/feature/sensor/AddSensorModal';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { Button, Form } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Map = dynamic(() => import('@/components/feature/map/map'), {
  ssr: false,
});

export default function MapPage() {
  return (
    <DefaultLayout header={false} footer={false} className="!p-0">
      <Map />
    </DefaultLayout>
  );
}
