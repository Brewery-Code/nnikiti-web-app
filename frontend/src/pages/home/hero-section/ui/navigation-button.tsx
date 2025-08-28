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
    <div className="group relative h-25 w-full cursor-pointer overflow-hidden rounded-[10px] shadow-lg lg:h-40 lg:w-64">
      <div className="rounded-inherit flex h-full w-full items-center justify-center bg-[#181413] transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-[30%]">
        <img className="hidden lg:block lg:h-24 lg:w-24" src={img} alt="navigation icon" />
        <p className="bg-gradient-to-tr from-[#f89b29] to-[#ff0f7b] bg-clip-text text-2xl font-bold text-transparent opacity-100 transition-opacity duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0 lg:text-3xl">
          {title}
        </p>
      </div>
      <div className="pointer-events-none absolute top-0 left-0 flex h-full w-full -translate-x-[96%] transform flex-col items-center justify-center gap-2 rounded-[5px] bg-gradient-to-tr from-[#f89b29] to-[#ff0f7b] p-5 text-center leading-[1.5] text-[#e8e8e8] transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0">
        <p className="text-2xl font-bold lg:text-3xl">{subtitle}</p>
        <p className="hidden lg:inline">{description}</p>
      </div>
    </div>
  );
}
