import DefaultLayout from '@/components/layout/DefaultLayout';
import { Logo } from '@/public';
import{
    MdEnergySavingsLeaf,
    MdNewReleases,
    MdPaid,
    MdMoreTime,
} from  'react-icons/md';

export default function About() {
    return (
        <DefaultLayout title="Embersense">
            <div>
                <div className="min-h-[100vh] w-full bg-black">
                    <img class="object-cover object-center h-[100vh] w-full" src={"https://images.pexels.com/photos/6352761/pexels-photo-6352761.jpeg"} alt="bgImg"/>
                </div>
                <div className="p-10 grid content-center bg-white">
                    <div className='w-full p-5 md:text-left text-lg text-center font-black'>EMBERSENSE</div>
                    <div className=" w-full px-5 md:flex grid place-content-center md:justify-between pb-10">
                        <div className=' text-center md:text-left md:w-3/4 pb-10'>
                            EmberSense adalah sebuah sistem pendeteksi kebakaran hutan berbasis Internet of Things (IoT) yang berkomunikasi secara near real-time melalui sebuah website untuk memberitahukan jika terjadinya kebakaran. Sensor yang digunakan pada sistem ini adalah Linear Heat Sensor (LHS) yang akan digunakan untuk memantau suhu secara kontinu dan mengidentifikasi perubahan suhu sebagai indikasi awal terjadinya kebakaran hutan. 
                        </div>
                        <div className='grid justify-items-center md:w-1/3'>
                            {/* <img class="w-30" src={Logo} alt=''/> */}
                            <MdEnergySavingsLeaf className="w-20 h-20"/>
                        </div>
                    </div>
                    <div className='mx-5 p-8 w-full text-center font-semibold  grid md:flex justify-around bg-slate-300'>
                        <div className='py-3 grid justify-items-center'>
                            <div className='pb-3'><MdNewReleases className="w-10 h-10"/></div>
                            PENDETEKSI DINI
                        </div>
                        <div className='py-3 grid justify-items-center'>
                            <div className='pb-3'><MdPaid className="w-10 h-10"/></div>
                            MURAH
                        </div>
                        <div className='py-3 grid justify-items-center'>
                            <div className='pb-3'><MdEnergySavingsLeaf className="w-10 h-10"/></div>
                            HEMAT ENERGI
                        </div>
                        <div className='py-3 grid justify-items-center'>
                            <div className='pb-3'><MdMoreTime className="w-10 h-10"/></div>
                            BERTAHAN 3 TAHUN
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>        
    )
}
