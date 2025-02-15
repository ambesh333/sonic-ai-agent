'use client'
import * as React from 'react'
import { 
  type BaseError, 
  useSendTransaction, 
  useWaitForTransactionReceipt 
} from 'wagmi' 
import { parseEther } from 'viem' 
 
export function SendTransaction() {
  const { 
    data: hash,
    error, 
    isPending, 
    sendTransaction 
  } = useSendTransaction() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const to = formData.get('address') as `0x${string}` 
    const value = formData.get('value') as string 
    sendTransaction({ to, value: parseEther(value) }) 
  } 

  const { data: receipt, isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 

  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button 
        disabled={isPending} 
        type="submit"
      >
        {isPending ? 'Confirming...' : 'Send'} 
      </button>
      
      {hash && <div>Transaction Hash: {hash}</div>} 
      {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && (
        <div>
          <p>Transaction confirmed!</p>
          <p><b>Sender:</b> {receipt?.from}</p>
          <p><b>Receiver:</b> {receipt?.to}</p>
          <p><b>Gas Used:</b> {receipt?.gasUsed?.toString()}</p>
          <p><b>Gas Price:</b> {receipt?.effectiveGasPrice?.toString()}</p>
          <p><b>Gas Fees:</b> {receipt?.gasUsed && receipt?.effectiveGasPrice 
            ? parseFloat(receipt.gasUsed.toString()) * parseFloat(receipt.effectiveGasPrice.toString()) / 1e18 + ' S'
            : 'N/A'}
          </p>
        </div>
      )}
      
      {error && ( 
        <div>Error: {(error as BaseError).shortMessage || error.message}</div> 
      )} 
    </form>
  )
}
