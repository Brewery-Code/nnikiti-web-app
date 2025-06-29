export default function NavigationButton({
  img,
  title,
  subtitle,
  description,
}: {
  img: string;
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <div className=" w-full h-25 lg:w-64 lg:h-40 relative rounded-[10px] shadow-lg overflow-hidden cursor-pointer group">
      <div className="w-full h-full rounded-inherit flex items-center justify-center bg-[#181413] transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-[30%]">
        <img
          className="hidden lg:block lg:w-24 lg:h-24"
          src={img}
          alt="navigation icon"
        />
        <p className="text-2xl lg:text-3xl font-bold opacity-100 bg-gradient-to-tr from-[#f89b29] to-[#ff0f7b] bg-clip-text text-transparent transition-opacity duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0">
          {title}
        </p>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center gap-2 bg-gradient-to-tr from-[#f89b29] to-[#ff0f7b] text-[#e8e8e8] p-5 leading-[1.5] rounded-[5px] pointer-events-none transform -translate-x-[96%] transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0">
        <p className="text-2xl lg:text-3xl font-bold">{subtitle}</p>
        <p className="hidden lg:inline">{description}</p>
      </div>
    </div>
  );
}
