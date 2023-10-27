import AddSensorModal from '@/components/feature/sensor/AddSensorModal';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { Button, Form } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Map = dynamic(() => import('@/components/feature/map/map'), {
  ssr: false,
});

export default function MapPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [form] = Form.useForm();

  return (
    <DefaultLayout>
      <Map />

      <Button
        type="primary"
        className="absolute bottom-8 right-8 z-20"
        onClick={() => setIsCreateModalOpen(true)}
      >
        Tambah Sensor
      </Button>

      <AddSensorModal
        form={form}
        isOpen={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
      />
    </DefaultLayout>
  );
}
