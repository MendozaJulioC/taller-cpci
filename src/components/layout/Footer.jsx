import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            <Image
              src="/Img/logocpci.png"
              alt="Picture of the author"
              width={100}
              height={100}
            />
          </p>
        </div>
        <div>
          <p className=" text-sm text-slate-500">
            <Image
              src="/Img/logo_2022.png"
              alt="Picture of the author"
              width={180}
              height={180}
            />
          </p>
        </div>
      </div>
    </footer>
  );
}