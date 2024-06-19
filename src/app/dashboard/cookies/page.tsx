import { TabBar } from "@/components";
import { cookies } from "next/headers";

export const metadata = {
  title: "Cookies page",
};

export default function CookiesPage() {
  const cookieStore = cookies();
  const selectedTab = cookieStore.get("selectedTab")?.value ?? "1";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <p className="text-3xl">Tabs</p>
        <TabBar currentTab={Number(selectedTab)} />
      </div>
    </div>
  );
}
