import Image from 'next/image'





export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
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
        
      </div>
    </header>
  );
}



 
