import { Wallet } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { ConnectWallet } from "./connectWallet";
import { SendTransaction } from "./sendTnx";

export function Header() {
    return (
        <header className="border-b">
            <div className="container flex items-center justify-between h-16 px-4">
                <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <h1 className="text-xl font-bold">Social Oracle</h1>
                </div>
                <div className="flex  items-center gap-4">
                    <SendTransaction/>
                    <ModeToggle />
                    <ConnectWallet />
                </div>
            </div>
        </header>
    )
}