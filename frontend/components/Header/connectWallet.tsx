'use client'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import Jazzicon from 'react-jazzicon'
import { Button } from '@/components/ui/button'
import { Wallet, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { blazeSonicTestnet } from '@/lib/config'

interface ConnectWalletProps {
    landing?: boolean
}

export function ConnectWallet({ landing = false }: ConnectWalletProps) {
    const { address, isConnected } = useAccount()
    const { connect, connectors } = useConnect()
    const { disconnect } = useDisconnect()
    const router = useRouter()
    const [autoRedirect, setAutoRedirect] = useState(false)

    const truncatedAddress = address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : ''

    const handleConnect: (connector: any) => Promise<void> = async (connector: any) => {
        try {
            if (landing) {
                setAutoRedirect(true)
            }
            await connect({ chainId: blazeSonicTestnet.id, connector })
        } catch (error) {
            console.error('Error connecting wallet or switching chain:', error)
            if (landing) {
                setAutoRedirect(false)
            }
        }
    }

    const disconnectWallet = () => {
        disconnect()
        router.push('/')
    }

    useEffect(() => {
        if (landing && isConnected && autoRedirect) {
            router.push('/chat')
        }
    }, [landing, isConnected, autoRedirect, router])

    if (landing) {
        if (isConnected) {
            if (!autoRedirect) {
                return (
                    <Button onClick={() => router.push('/chat')}>
                        Start Interacting
                    </Button>
                )
            }
            return null
        }
        return (
            <Button onClick={() => handleConnect(connectors[0])}>
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
            </Button>
        )
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
                            <DropdownMenuItem onClick={disconnectWallet}>
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