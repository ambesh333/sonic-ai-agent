'use client'
import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Transaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const sortedTransactions = [...transactions].sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp))

  // Calculate total pages based on the rows per page
  const totalPages = Math.ceil(sortedTransactions.length / rowsPerPage)
  const displayedTransactions = sortedTransactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  // Change page handlers
  const handlePageChange = (page: number) => setCurrentPage(page)
  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1)
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1)

  // Utility: truncate addresses
  const truncateAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`

  // Utility: convert epoch to IST
  const convertEpochToIST = (epoch: string) => {
    const date = new Date(Number(epoch) * 1000)
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  }

  // Utility: calculate transaction fee in ETH
  const calculateTransactionFee = (gasUsed: string, gasPrice: string) => {
    const gasUsedBN = BigInt(gasUsed)
    const gasPriceBN = BigInt(gasPrice)
    const feeInWei = gasUsedBN * gasPriceBN
    const feeInEth = Number(feeInWei) / 1e18
    return feeInEth.toFixed(6) // Display up to 6 decimal places
  }

  const valueConverter = (value: any) => {
    const valueBN = BigInt(value)
    const valueInEth = Number(valueBN) / 1e18
    return valueInEth.toFixed(6)
  }

  return (
    <div>
      <Table>
        <TableCaption>Transaction History</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">#</TableHead>
            <TableHead>Trx Fee (SONIC)</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Time (IST)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedTransactions.map((tx, index) => (
            <TableRow
              key={tx.hash}
              className="cursor-pointer hover:bg-neutral-900"
              onClick={() =>
                window.open(`https://testnet.sonicscan.org/tx/${tx.hash}`, "_blank")
              }
            >
              <TableCell>{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
              <TableCell>{calculateTransactionFee(tx.gasUsed, tx.gasPrice)}</TableCell>
                <TableCell>{valueConverter(tx.value)}</TableCell>
              <TableCell>{truncateAddress(tx.from)}</TableCell>
              <TableCell>{truncateAddress(tx.to)}</TableCell>
              <TableCell>{convertEpochToIST(tx.timeStamp)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Pagination and Rows Per Page controls */}
      <div className="flex items-center justify-between mt-4">

        {/* Pagination controls */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handlePrevious()
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(page)
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handleNext()
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
