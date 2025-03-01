import { Wallet } from "lucide-react";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { ConnectWallet } from "./connectWallet";
import { SendTransaction } from "./sendTnx";
import Link from "next/link";

export function Header() {
    return (
        <header className="border-b">
            <div className="container flex items-center justify-between h-16 px-4">
                <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <Link href="/" className="text-xl font-bold">
                        Sonic Chat
                    </Link>

                </div>
                <div className="flex  items-center gap-4">
                    <ConnectWallet />
                </div>
            </div>
        </header>
    )
}