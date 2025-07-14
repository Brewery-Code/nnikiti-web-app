import { publicRqClient } from "@/shared/api/instance";

export default function UserMenu() {
  const userData = publicRqClient.useQuery("get", "/users/me/").data;

  return (
    <div className="flex items-center gap-2 h-8 py-1 px-2 rounded-4xl cursor-pointer outline-2 outline-[white]">
      <img
        className="rounded-full w-full h-full object-cover"
        src={userData?.avatar}
        alt=""
      />
      <span className="text-ellipsis leading-6 font-bold">
        {userData?.first_name}
      </span>
    </div>
  );
}
