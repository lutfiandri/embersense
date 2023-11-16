/* eslint-disable @next/next/no-img-element */
import DefaultLayout from '@/components/layout/DefaultLayout';
import {
  MdEnergySavingsLeaf,
  MdNewReleases,
  MdPaid,
  MdMoreTime,
} from 'react-icons/md';

export default function About() {
  return (
    <DefaultLayout title="Embersense" className='!p-0'>
      <div>
        <div className="min-h-[100vh] w-full bg-cover bg-center bg-fixed">
          <img
            className="object-cover object-center h-[100vh] w-full bg-[#252422]"
            src={
              // 'https://images.pexels.com/photos/6352761/pexels-photo-6352761.jpeg'
              '/hardware.png'
            }
            alt="bgImg"
          />
        </div>
        <div className="p-10 grid content-center bg-white">
          <div className="w-full p-5 md:text-left text-lg text-center font-black">
            EMBERSENSE
          </div>
          <div className=" w-full px-5 md:flex grid place-content-center md:justify-between pb-10">
            <div className=" text-center md:text-left md:w-3/4 pb-10">
              EmberSense adalah sebuah sistem pendeteksi kebakaran hutan
              berbasis Internet of Things (IoT) yang berkomunikasi secara near
              real-time melalui sebuah website untuk memberitahukan jika
              terjadinya kebakaran. Sensor yang digunakan pada sistem ini adalah
              Linear Heat Sensor (LHS) yang akan digunakan untuk memantau suhu
              secara kontinu dan mengidentifikasi perubahan suhu sebagai
              indikasi awal terjadinya kebakaran hutan.
            </div>
            <div className="grid justify-items-center md:w-1/4">
                <img
                src="/embersense.svg"
                alt="Embersense Logo"
                className="w-32 h-32"
                />
            </div>
          </div>
          <div className=" p-8 w-full text-center font-semibold  grid md:flex justify-around bg-[#F4EACB]">
            <div className="py-3 grid justify-items-center">
                <img
                    src="/deteksi.png"
                    alt="Early Detection Icon"
                    className="w-32 h-32"
                    />
              PENDETEKSI DINI
            </div>
            <div className="py-3 grid justify-items-center">
              <div className="pb-3">
                <img
                    src="/hemat.png"
                    alt="Cost Effective Icon"
                    className="w-32 h-32"
                    />
              </div>
              MURAH
            </div>
            <div className="py-3 grid justify-items-center">
              <div className="pb-3">
                <img
                    src="/energi.png"
                    alt="Energy Saving Icon"
                    className="w-32 h-32"
                    />
              </div>
              HEMAT ENERGI
            </div>
            <div className="py-3 grid justify-items-center">
              <div className="pb-3">
                <img
                    src="/baterai.png"
                    alt="Long Lasting Battery Icon"
                    className="w-32 h-32"
                    />
              </div>
              BERTAHAN 3 TAHUN
            </div>
          </div>
        </div>
        <div className='p-10 grid content-center w-full bg-[#e0cbae]'>
            <div className='text-center font-black text-xl'>OUR TEAM</div>
            <div className='pt-10 md:grid-cols-3 grid md:justify-center text-center place-content-center'>
                <div className='grid justify-items-center py-5'>
                    <img
                      src="/arya.png"
                      alt="Arya Dwi Pramudya"
                      className="object-scale-down h-48 rounded-lg"
                    />
                    Arya Dwi Pramudya <br/> Teknik Elektro
                </div>
                <div className='grid justify-items-center py-5'>
                    <img
                      src="/lutfi.png"
                      alt="Lutfi Andriyanto"
                      className="object-scale-down h-48 rounded-lg"
                    />
                    Lutfi Andriyanto <br/> Teknologi Informasi
                </div>
                <div className='grid justify-items-center py-5'>
                    <img
                      src="/yana.png"
                      alt="Yanayir Rifai"
                      className="object-scale-down h-48 rounded-lg"
                    />
                    Yanayir Rifai <br/> Teknik Biomedis
                </div>
            </div>
            <div className='md:flex grid md:space-x-36 text-center place-content-center'>
                <div className='grid justify-items-center py-5'>
                    <img
                      src="/kurnia.png"
                      alt="Kurnia Dwi Utami"
                      className="object-scale-down h-48 rounded-lg"
                    />
                    Kurnia Dwi Utami <br/> Teknologi Informasi
                </div>
                <div className='grid justify-items-center py-5 '>
                    <img
                      src="/nia.png"
                      alt="Siti Malatania"
                      className="object-scale-down h-48 rounded-lg"
                    />
                    Siti Malatania <br/> Teknologi Informasi
                </div>
            </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
