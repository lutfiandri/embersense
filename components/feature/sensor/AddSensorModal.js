import { insertSensor } from '@/services/sensor';
import { Button, Form, Input, InputNumber, Modal, notification } from 'antd';
import { useEffect } from 'react';

export default function AddSensorModal({
  isOpen,
  onCancel,
  form,
  lat,
  long,
  notificationApi,
}) {
  useEffect(() => {
    form.setFieldValue('latitude', lat);
    form.setFieldValue('longitude', long);
  }, [form, lat, long]);

  const submitHandler = async () => {
    try {
      const data = form.getFieldsValue();
      console.log(data);
      await insertSensor(data);
      notificationApi.success({
        message: 'Berhasil',
        description: `Sensor ${data.sensorName} berhasil ditambahkan`,
      });
      form.setFieldsValue({
        sensorId: '',
        sensorName: '',
        longitude: null,
        latitude: null,
      });
      onCancel();
    } catch (error) {
      console.error(error);
      notificationApi.error({
        message: 'Gagal menambahakan sensor',
        description: error.message,
      });
    }
  };

  return (
    <Modal
      title="Tambah Sensor"
      open={isOpen}
      onCancel={onCancel}
      cancelText="Batalkan"
      maskClosable={false}
      footer={null}
    >
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name="sensorId"
          label="ID sensor"
          rules={[
            { required: true, message: 'ID sensor harus diisi' },
            { len: 8, message: 'ID sensor harus 8 karakter' },
          ]}
        >
          <Input placeholder="Masukkan ID sensor" />
        </Form.Item>

        <Form.Item
          name="sensorName"
          label="Nama sensor"
          rules={[{ required: true, message: 'Nama sensor harus diisi' }]}
        >
          <Input placeholder="Masukkan nama sensor" />
        </Form.Item>

        <Form.Item
          name="latitude"
          label="Latitude"
          rules={[{ required: true, message: 'Latitude harus diisi' }]}
        >
          <InputNumber
            placeholder="Masukkan latitude"
            className="w-full"
            // defaultValue={lat}
          />
        </Form.Item>

        <Form.Item
          name="longitude"
          label="Longitude"
          rules={[{ required: true, message: 'Longitude harus diisi' }]}
        >
          <InputNumber
            placeholder="Masukkan longitude"
            className="w-full"
            // defaultValue={long}
          />
        </Form.Item>

        <Form.Item>
          <div className="flex flex-row-reverse">
            <Button type="primary" className="" onClick={submitHandler}>
              Tambah
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
