// App.tsx
"use client"
import { Header } from '@/components/Header/header';
import { useState } from 'react';
import { sendTransaction } from 'viem/actions';
import {  useAccount , useWalletClient ,useSendTransaction} from 'wagmi';

export default function App() {
  const { data: signer } = useWalletClient();
  const { address } = useAccount();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !signer) {
      setStatus('Connect your wallet first.');
      return;
    }
    setStatus('Preparing transaction...');
    try {
      const prepareRes = await fetch('http://localhost:3001/v1/tx/getTx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: address,
          to: toAddress,
          amount: amount
        })
      });
      const prepareData = await prepareRes.json();
      console.log('Prepared data:', prepareData);
      if (prepareData.error) {
        setStatus('Error: ' + prepareData.error);
        return;
      }
      const txObject = prepareData.tx;
      console.log('Prepared transaction:', txObject);

      const transactionParams = {
        account: address,
        chain: { id: txObject.chainId },
        to: txObject.to,
        value: txObject.value,
        nonce: txObject.nonce,
        gas: txObject.gasLimit,
        gasPrice: txObject.gasPrice,
        data: txObject.data,
      };
      
      // setStatus('Signing transaction...');
      // const signedTx = await signer.signTransaction(txObject);
      // console.log('Signed transaction:', signedTx);
      // setStatus('Sending transaction...');
      // // Step 3: Send the signed transaction to the backend to broadcast
      // const sendRes = await fetch('http://localhost:3001/sendTx', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ signedTx })
      // });
      // const sendData = await sendRes.json();
      // if (sendData.error) {
      //   setStatus('Error: ' + sendData.error);
      //   return;
      // }
      // setTxHash(sendData.txHash);
      // setStatus('Transaction sent! Tx Hash: ' + sendData.txHash);
    } catch (err: any) {
      console.error(err);
      setStatus('Error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
              <Header />
      <h1>Send ETH via Backend-Constructed Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Receiver Address:</label><br />
          <input
            type="text"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            placeholder="0x..."
            required
            style={{ width: '400px', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Amount (ETH):</label><br />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.1"
            required
            step="any"
            style={{ padding: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.75rem 1.5rem' }}>
          Send Transaction
        </button>
      </form>
      <p>{status}</p>
      {txHash && (
        <p>
          Transaction Hash:{' '}
          <a href={`https://rinkeby.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
            {txHash}
          </a>
        </p>
      )}
    </div>
  );
}
