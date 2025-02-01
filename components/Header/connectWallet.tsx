'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import Jazzicon from 'react-jazzicon'
import { Button } from '@/components/ui/button'
import { Wallet, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { blazeSonicTestnet } from '@/lib/config'

export function ConnectWallet() {
    const { address, isConnected } = useAccount()
    const { connect, connectors } = useConnect()
    const { disconnect } = useDisconnect()
    const [showDropdown, setShowDropdown] = useState(false)

    const handleToggleDropdown = () => {
        setShowDropdown((prev) => !prev)
    }

    const truncatedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''

    const handleConnect = async (connector: any) => {
        try {

            await connect({ chainId: blazeSonicTestnet.id, connector })

        } catch (error) {
            console.error('Error connecting wallet or switching chain:', error)
        }
    }

    return (
        <div className="flex items-center gap-2">
            {isConnected ? (
                <>
                    <div className="flex items-center gap-2">
                        {address && (
                            <Jazzicon diameter={32} seed={parseInt(address.slice(2, 10), 16)} />
                        )}
                        <span>{truncatedAddress}</span>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" className="flex items-center gap-2">
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => disconnect()}>
                                Disconnect Wallet
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            ) : (
                <Button onClick={() => handleConnect(connectors[0])}>
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                </Button>
            )}
        </div>
    )
}