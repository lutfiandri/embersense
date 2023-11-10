import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import axios from 'axios';
import { useState } from 'react';

const BE_PY_BASEURL = process.env.NEXT_PUBLIC_BE_PY_BASEURL;

export default function RecommendationModal({
  isOpen,
  onCancel,
  form,
  polygonNodes,
  setRecommendationResult,
  setStep,
  notificationApi,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async () => {
    try {
      setIsLoading(true);

      const data = form.getFieldsValue();
      // check selected one
      if (!data.count && !data.node_length) {
        notificationApi.error({
          message: 'Form tidak lengkap',
          description:
            'Isi salah satu dari Jumlah Sensor atau Jarak Antar Sensor!',
        });
        return;
      }

      data.polygon = polygonNodes;

      console.log(data);

      if (data.count) {
        const result = await axios.post(
          BE_PY_BASEURL + '/recommend-by-count',
          data
        );
        console.log(result.data);
        setRecommendationResult(result?.data);
      } else {
        const result = await axios.post(
          BE_PY_BASEURL + '/recommend-by-distance',
          data
        );
        console.log(result.data);
        setRecommendationResult(result?.data);
      }
      setStep(2);
      onCancel();
    } catch (error) {
      notificationApi.error({
        message: 'Gagal',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Rekomendasi"
      open={isOpen}
      onCancel={onCancel}
      maskClosable={false}
      footer={null}
      closeIcon={false}
    >
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name="pattern"
          label="Pola Persebaran Sensor"
          rules={[
            { required: true, message: 'Pola persebaran sensor harus dipilih' },
          ]}
        >
          <Select
            options={[
              {
                value: 'triangle',
                label: 'Segitiga Sama Sisi',
              },
              {
                value: 'square',
                label: 'Persegi',
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="degree"
          label="Sudut Rotasi (derajat)"
          rules={[{ required: true, message: 'Sudut rotasi harus diisi' }]}
        >
          <InputNumber placeholder="Masukkan sudut rotasi" className="w-full" />
        </Form.Item>

        <div className="text-md font-bold mb-2">Pilih Salah Satu</div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="count" label="Jumlah Sensor">
            <InputNumber
              placeholder="Masukkan jumlah sensor"
              className="w-full"
            />
          </Form.Item>
          <Form.Item name="node_length" label="Jarak Antar Sensor (meter)">
            <InputNumber placeholder="Masukkan jarak" className="w-full" />
          </Form.Item>
        </div>

        <Form.Item>
          <div className="flex flex-row-reverse">
            <Button
              type="primary"
              className=""
              onClick={submitHandler}
              disabled={isLoading}
            >
              Lakukan Rekomendasi
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
