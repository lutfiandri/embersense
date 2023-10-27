import { upsertSensor } from '@/services/sensor';
import { Button, Form, Input, InputNumber, Modal, notification } from 'antd';

export default function AddSensorModal({ isOpen, onCancel, form }) {
  const [api, contextHolder] = notification.useNotification();

  const submitHandler = async () => {
    try {
      const data = form.getFieldsValue();
      console.log(data);
      await upsertSensor(data);
      api.success({
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
      api.error({
        message: 'Gagal menambahakan sensor',
      });
    }
  };

  return (
    <Modal
      title="Mo"
      open={isOpen}
      onCancel={onCancel}
      cancelText="Batalkan"
      maskClosable={false}
      footer={null}
    >
      {contextHolder}
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name="sensorId"
          label="ID sensor"
          rules={[{ required: true }]}
        >
          <Input placeholder="Masukkan ID sensor" />
        </Form.Item>

        <Form.Item
          name="sensorName"
          label="Nama sensor"
          rules={[{ required: true }]}
        >
          <Input placeholder="Masukkan nama sensor" />
        </Form.Item>

        <Form.Item
          name="latitude"
          label="Latitude"
          rules={[{ required: true }]}
        >
          <InputNumber placeholder="Masukkan latitude" className="w-full" />
        </Form.Item>

        <Form.Item
          name="longitude"
          label="Longitude"
          rules={[{ required: true }]}
        >
          <InputNumber placeholder="Masukkan longitude" className="w-full" />
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
