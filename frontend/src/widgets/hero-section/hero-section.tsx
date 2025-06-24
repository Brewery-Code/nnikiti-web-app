import imgTest from "./test.jpg";
export default function HeroSection() {
  return (
    <div
      className="w-full h-[calc(100dvh-80px)] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.1) 90%, rgba(0,0,0,1) 100%),
          url(${imgTest})
        `,
      }}
    >
      <div className="container-base">
        <h1 className="pt-[7dvh] text-8xl leading-24 font-bold -tracking-tighter">
          EVERY GIANT LEAP STARTS WITH ONE SMALL STEP
        </h1>
        <h2 className="mt-4 text-2xl leading-6 font-bold tracking-[0.12em]">
          EVERY GIANT LEAP STARTS WITH ONE SMALL STEP EVERY{" "}
        </h2>
      </div>
    </div>
  );
}
