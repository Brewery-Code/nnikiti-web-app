import testImg from "./test.png";

export function GraduateCard() {
  return (
    <div className="flex gap-4 h-48 p-4 bg-[rgba(255,255,255,0.2)] backdrop-blur-md border border-white/20 shadow-md rounded-3xl cursor-pointer">
      <img
        className="object-cover w-32 h-full border border-white/20 rounded-xl"
        src={testImg}
        alt=""
      />
      <p className="overflow-hidden">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi quas
        asperiores vel laudantium non ad obcaecati. Pariatur quibusdam minus in
        eum! Eum excepturi maxime sit labore voluptas, ducimus doloribus
        accusantium!Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Nisi quas asperiores vel laudantium non ad obcaecati. Pariatur quibusdam
        minus in eum! Eum excepturi maxime sit labore voluptas, ducimus
        doloribus accusantium!Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Nisi quas asperiores vel laudantium non ad obcaecati.
        Pariatur quibusdam minus in eum! Eum excepturi maxime sit labore
        voluptas, ducimus doloribus accusantium!Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Nisi quas asperiores vel laudantium non
        ad obcaecati. Pariatur quibusdam minus in eum! Eum excepturi maxime sit
        labore voluptas, ducimus doloribus accusantium!Lorem ipsum dolor sit
        amet consectetur, adipisicing elit. Nisi quas asperiores vel laudantium
        non ad obcaecati. Pariatur quibusdam minus in eum! Eum excepturi maxime
        sit labore voluptas, ducimus doloribus accusantium!Lorem ipsum dolor sit
        amet consectetur, adipisicing elit. Nisi quas asperiores vel laudantium
        non ad obcaecati. Pariatur quibusdam minus in eum! Eum excepturi maxime
        sit labore voluptas, ducimus doloribus accusantium!Lorem ipsum dolor sit
        amet consectetur, adipisicing elit. Nisi quas asperiores vel laudantium
        non ad obcaecati. Pariatur quibusdam minus in eum! Eum excepturi maxime
        sit labore voluptas, ducimus doloribus accusantium!Lorem ipsum dolor sit
        amet consectetur, adipisicing elit. Nisi quas asperiores vel laudantium
        non ad obcaecati. Pariatur quibusdam minus in eum! Eum excepturi maxime
        sit labore voluptas, ducimus doloribus accusantium!Lorem ipsum dolor sit
        amet consectetur, adipisicing elit. Nisi quas asperiores vel laudantium
        non ad obcaecati. Pariatur quibusdam minus in eum! Eum excepturi maxime
        sit labore voluptas, ducimus doloribus accusantium!
      </p>
    </div>
  );
}
