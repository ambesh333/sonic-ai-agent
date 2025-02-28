'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowRight, Check } from 'lucide-react';

const TokenTransfer = () => {
  const [transferStep, setTransferStep] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  
  const startAnimation = () => {
    setShowAnimation(true);
    let step = 1;
    
    const interval = setInterval(() => {
      setTransferStep(step);
      step++;
      
      if (step > 3) {
        clearInterval(interval);
        setTimeout(() => {
          setShowAnimation(false);
          setTransferStep(0);
        }, 2000);
      }
    }, 1000);
  };

  return (
    <section id="token-transfer" className="py-20 px-4 md:px-8 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <Wallet className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Seamless Transfers</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Send Tokens with Simple Chat Commands
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Transfer tokens to any address on Sonic Chain with natural language commands.
            Fast, secure, and intuitive - no complicated interfaces.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Chat Interface */}
          <motion.div 
            className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="border-b border-white/10 p-4">
              <h3 className="font-medium">SonicChat</h3>
            </div>
            
            <div className="p-4 h-96 overflow-y-auto flex flex-col gap-4">
              {/* Chat messages */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                  SC
                </div>
                <div className="bg-white/10 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                  <p>Hello! How can I help you with Sonic Chain today?</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 self-end">
                <div className="bg-blue-500/20 rounded-lg rounded-tr-none p-3 max-w-[80%]">
                  <p>I want to send 10 SONIC tokens to 0x742...3F9</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">
                  You
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                  SC
                </div>
                <div className="bg-white/10 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                  <p>I'll help you send 10 SONIC tokens to 0x742...3F9. Please confirm this transaction.</p>
                  
                  <div className="mt-3 p-3 bg-white/5 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Amount:</span>
                      <span className="font-medium">10 SONIC</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Recipient:</span>
                      <span className="font-medium">0x742...3F9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fee:</span>
                      <span className="font-medium">0.001 SONIC</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                    <motion.button
                      className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-center text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startAnimation}
                    >
                      Confirm
                    </motion.button>
                    <button className="flex-1 py-2 rounded-lg bg-white/10 text-center text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              
              {showAnimation && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                    SC
                  </div>
                  <div className="bg-white/10 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                    <p>
                      {transferStep === 0 && "Processing your transaction..."}
                      {transferStep === 1 && "Verifying wallet balance..."}
                      {transferStep === 2 && "Sending tokens to recipient..."}
                      {transferStep === 3 && (
                        <span className="flex items-center text-green-400">
                          <Check className="w-4 h-4 mr-2" />
                          Transaction complete! 10 SONIC tokens sent successfully.
                        </span>
                      )}
                    </p>
                    
                    {transferStep === 3 && (
                      <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Transaction ID:</span>
                          <span className="font-medium">0x8f72...6e91</span>
                        </div>
                        <button className="mt-2 w-full py-2 rounded-lg bg-white/10 text-center text-sm font-medium">
                          View on Explorer
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <motion.button
                  className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
          
          {/* Features */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              {
                title: "Natural Language Commands",
                description: "Simply type what you want to do in plain English. No need to learn complex interfaces or commands."
              },
              {
                title: "Instant Transfers",
                description: "Send tokens in seconds with minimal fees. Transactions are processed immediately on the Sonic Chain network."
              },
              {
                title: "Enhanced Security",
                description: "Multi-factor authentication and advanced encryption keep your assets safe at all times."
              },
              {
                title: "Transaction History",
                description: "Easily access your complete transaction history with detailed information about each transfer."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TokenTransfer;