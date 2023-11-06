import React from "react";
import { FaTrashCan } from "react-icons/fa6";

const handleDelete = (device) => {
  console.log(`You clicked me! ${device}`);
};

export const columns = [
  {
    name: "Id",
    selector: "id",
    sortable: true,
  },
  {
    name: "Nama Sensor",
    selector: "device",
    sortable: true,
  },
  {
    name: "Longitude",
    selector: "longitude",
    sortable: true,
    // cell: (d) => (
    //   <a href="https://google.com" target="_blank" className="dlink">
    //     {d.director}
    //   </a>
    // ),
  },
  {
    name: "Latitude",
    selector: "latitude",
    sortable: true,
  },
  {
    name: "Waktu Hidup",
    selector: "on",
    sortable: true,
    // cell: (d) => <span>{d.genres.join(", ")}</span>,
  },
  {
    name: "Waktu Mati",
    selector: "off",
    sortable: true,
  },
  {
    name: "Action",
    sortable: false,
    selector: "null",
    cell: (d) => (
      <FaTrashCan onClick={() => handleDelete(d.device)} className="center" />
    ),
  },
];

export const data = [
  {
    id: 1,
    device: "Beetlejuice",
    longitude: "-7.766244",
    latitude: "110.379141",
    on: "27 Oktober 2023",
    off: "27 Oktober 2024",
  },
  {
    id: 2,
    device: "Beetlejuice",
    longitude: "-7.766244",
    latitude: "110.379141",
    on: "27 Oktober 2023",
    off: "27 Oktober 2024",
  },
  // {
  //   id: 5,
  //   device: "Valkyrie",
  //   year: "2008",
  //   runtime: "121",
  //   genres: ["Drama", "History", "Thriller"],
  //   director: "Bryan Singer",
  //   actors: "Tom Cruise, Kenneth Branagh, Bill Nighy, Tom Wilkinson",
  //   plot: "A dramatization of the 20 July assassination and political coup plot by desperate renegade German Army officers against Hitler during World War II.",
  //   posterUrl:
  //     "http://ia.media-imdb.com/images/M/MV5BMTg3Njc2ODEyN15BMl5BanBnXkFtZTcwNTAwMzc3NA@@._V1_SX300.jpg",
  // },
];
