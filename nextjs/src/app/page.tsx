import Chat from "./components/Chat/Chat";
import Sidebar from "./components/Sidebar";

export default function Home() {
    return (
        <main className="flex flex-row w-screen h-screen font-[family-name:var(--font-nunito)]">
			<Sidebar />
            <Chat />
        </main>
    );
}
