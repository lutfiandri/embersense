import DefaultLayout from "@/components/layout/DefaultLayout";
import Table from "@/components/feature/tabel/table";

export default function Dashboard() {
  return (
    <DefaultLayout>
      <div className="text-xl">
        <h1>Perangkat Sensor</h1>
      </div>
      <Table />
    </DefaultLayout>
  );
}
