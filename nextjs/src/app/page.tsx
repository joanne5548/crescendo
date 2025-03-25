import Chat from "./components/Chat/Chat";
import Sidebar from "./components/SideBar/Sidebar";

export default function Home() {
    return (
        <main className="flex flex-col sm:flex-row w-screen h-screen font-[family-name:var(--font-nunito)]">
            <Sidebar />
            <Chat />
        </main>
    );
}
