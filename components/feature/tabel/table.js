import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { TiArrowSortedDown } from "react-icons/ti";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { collection, getDocs, deleteDoc, updateDoc } from "firebase/firestore"; // Import Firestore functions
import { FaTrash } from "react-icons/fa";
import { Modal, Button } from "antd"; // Import Modal and Button from Ant Design

import { db } from "@/services/firebase";

const formatDateSeconds = (seconds) => {
  const date = new Date(seconds * 1000 || 0);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formatter = new Intl.DateTimeFormat("id-ID", options);
  const formattedDate = formatter.format(date);
  return formattedDate;
};

const Table = () => {
  const [tableData, setTableData] = useState({
    columns: [],
    data: [],
  });

  const [sensorToDelete, setSensorToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    // Fetch data from Firebase
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "sensors"));
        const data = [];

        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });

        const columns = [
          {
            name: "ID sensor",
            selector: "sensorId",
            sortable: true,
          },
          {
            name: "Nama sensor",
            selector: "sensorName",
            sortable: true,
          },
          {
            name: "Latitude",
            selector: "latitude",
            sortable: true,
          },
          {
            name: "Longitude",
            selector: "longitude",
            sortable: true,
          },
          {
            name: "Waktu Created",
            selector: "createdAt.seconds",
            sortable: true,
            format: (row) => formatDateSeconds(row.createdAt.seconds),
          },
          {
            name: "Waktu Mati",
            selector: "updatedAt.seconds",
            sortable: true,
            format: (row) => {
              const createdAt = row.createdAt.seconds;
              const updatedAt = row.updatedAt.seconds;

              if (updatedAt !== createdAt) {
                return formatDateSeconds(updatedAt); // Tampilkan waktu mati sesuai waktu update
              } else {
                return "Sensor Masih Hidup";
              }
            },
          },
          {
            name: "Action",
            sortable: false,
            cell: (row) => (
              <FaTrash
                type="primary"
                danger
                onClick={() => {
                  setSensorToDelete(row); // Menandai sensor yang akan dihapus
                  setShowDeleteConfirmation(true); // Tampilkan modal konfirmasi
                }}
              >
                Hapus Sensor
              </FaTrash>
            ),
          },
        ];

        setTableData({ columns, data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    if (sensorToDelete) {
      const sensorRef = collection(db, "sensors").doc(sensorToDelete.id);

      try {
        await deleteDoc(sensorRef);
        console.log("Sensor berhasil dihapus");
        // Setelah menghapus sensor, Anda dapat memuat ulang data atau memperbarui state data lokal Anda.
      } catch (error) {
        console.error("Error menghapus sensor:", error);
      }

      setSensorToDelete(null); // Reset sensorToDelete setelah penghapusan
      setShowDeleteConfirmation(false); // Tutup modal konfirmasi
    }
  };

  return (
    <div className="py-10 text-center shadow-xl">
      <DataTableExtensions {...tableData} print={false}>
        <DataTable
          columns={tableData.columns}
          data={tableData.data}
          noHeader
          defaultSortField="sensorId"
          ArrowSortedDown={<TiArrowSortedDown />}
          defaultSortAsc={true}
          pagination
          highlightOnHover
          responsive="true"
          dense
        />
      </DataTableExtensions>
      <Modal
        title="Hapus Sensor"
        visible={showDeleteConfirmation}
        onOk={handleDelete}
        onCancel={() => setShowDeleteConfirmation(false)}
      >
        <p>Are you sure you want to delete this sensor?</p>
      </Modal>
    </div>
  );
};

export default Table;
