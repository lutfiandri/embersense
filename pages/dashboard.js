import DefaultLayout from "@/components/layout/DefaultLayout";
import dynamic from "next/dynamic";

const Table = dynamic(() => import("@/components/feature/tabel/table"), {
  ssr: false,
});

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
