// 'use client'
// import React from 'react';
// import { motion } from 'framer-motion';
// import { MessageCircle, BarChart3, Wallet, Zap, ArrowRight } from 'lucide-react';

// const BentoGrid = () => {
//   const features = [
//     {
//       title: "Token Transfers",
//       description: "Send tokens to any address on Sonic Chain with simple chat commands. Fast, secure, and intuitive.",
//       icon: <Wallet className="w-6 h-6 text-blue-400" />,
//       video: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1632&auto=format&fit=crop",
//       color: "from-blue-500/20 to-blue-600/20",
//       size: "col-span-12 md:col-span-6"
//     },
//     {
//       title: "Market Insights",
//       description: "Get real-time market data, price alerts, and trading insights through natural language queries.",
//       icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
//       video: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1632&auto=format&fit=crop",
//       color: "from-purple-500/20 to-purple-600/20",
//       size: "col-span-12 md:col-span-6"
//     },
//     {
//       title: "Fund Information",
//       description: "Access detailed information about your funds, transaction history, and portfolio performance.",
//       icon: <Zap className="w-6 h-6 text-green-400" />,
//       video: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1632&auto=format&fit=crop",
//       color: "from-green-500/20 to-green-600/20",
//       size: "col-span-12 md:col-span-6"
//     },
//     {
//       title: "AI Assistant",
//       description: "Your personal blockchain guide, answering questions and providing assistance 24/7.",
//       icon: <MessageCircle className="w-6 h-6 text-orange-400" />,
//       video: "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=1632&auto=format&fit=crop",
//       color: "from-orange-500/20 to-orange-600/20",
//       size: "col-span-12 md:col-span-6"
//     }
//   ];

//   return (
//     <section id="features" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       viewport={{ once: true }}
//       className="text-center mb-16"
//     >
//       <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
//         Powerful Features for Sonic Chain Users
//       </h2>
//       <p className="text-gray-300 max-w-3xl mx-auto">
//         Experience the future of blockchain interaction with our intelligent chatbot assistant
//       </p>
//     </motion.div>
//     <div className="grid grid-cols-12 gap-4 md:gap-6">
//       {features.map((feature, index) => (
//         <motion.div
//           key={index}
//           className={`${feature.size} rounded-2xl overflow-hidden relative group`}
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: index * 0.1 }}
//           viewport={{ once: true, margin: "-100px" }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-br bg-gray-900 z-0"></div>
          
//           {/* Background gradient */}
//           <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 z-0`}></div>
          
//           {/* Border gradient */}
//           <div className="absolute inset-0 rounded-2xl border border-white/10 z-10"></div>
          
//           {/* Content */}
//           <div className="relative z-20 p-6 h-full flex flex-col">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-bold">{feature.title}</h3>
//             </div>
            
//             <p className="text-gray-300 mb-6">{feature.description}</p>
            
//             {/* Video/Image placeholder */}
//             <div className="mt-auto relative overflow-hidden rounded-lg aspect-video">
//               <img 
//                 src={feature.video} 
//                 alt={feature.title}
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//               />
//               {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
//                 <motion.button
//                   className="flex items-center gap-2 text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Watch Demo
//                   <ArrowRight className="w-4 h-4" />
//                 </motion.button>
//               </div> */}
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   </section>
//   );
// };

// export default BentoGrid;


'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, BarChart3, Wallet, Zap, ArrowRight } from 'lucide-react';

const BentoGrid = () => {
  const features = [
    {
      title: "Token Transfers",
      description: "Send tokens to any address on Sonic Chain with simple chat commands. Fast, secure, and intuitive.",
      icon: <Wallet className="w-6 h-6 text-blue-400" />,
      video: "/SendToken.mp4", 
      color: "from-blue-500/20 to-blue-600/20",
      size: "col-span-12 md:col-span-6"
    },
    {
      title: "Market Insights",
      description: "Get real-time market data, price alerts, and trading insights through natural language queries.",
      icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
      video: "/Prediction.mp4", 
      color: "from-purple-500/20 to-purple-600/20",
      size: "col-span-12 md:col-span-6"
    },
    {
      title: "Fund Information",
      description: "Access detailed information about your funds, transaction history, and portfolio performance.",
      icon: <Zap className="w-6 h-6 text-green-400" />,
      video: "/Funds.mp4",
      color: "from-green-500/20 to-green-600/20",
      size: "col-span-12 md:col-span-6"
    },
    {
      title: "AI Assistant",
      description: "Your personal blockchain guide, answering questions and providing assistance 24/7.",
      icon: <MessageCircle className="w-6 h-6 text-orange-400" />,
      video: "/AiChat.mp4", 
      color: "from-orange-500/20 to-orange-600/20",
      size: "col-span-12 md:col-span-6"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Powerful Features for Sonic Chain Users
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Experience the future of blockchain interaction with our intelligent chatbot assistant
        </p>
      </motion.div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`${feature.size} rounded-2xl overflow-hidden relative group`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br bg-gray-900 z-0"></div>
            
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 z-0`}></div>
            
            {/* Border gradient */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 z-10"></div>
            
            {/* Content */}
            <div className="relative z-20 p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </div>
              
              <p className="text-gray-300 mb-6">{feature.description}</p>
              
              {/* Video placeholder */}
              <div className="mt-auto relative overflow-hidden rounded-lg aspect-video">
                <video 
                  src={feature.video} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                {/* Uncomment the below section if you need an overlay button for extra controls */}
                {/*
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <motion.button
                    className="flex items-center gap-2 text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Watch Demo
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
                */}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;
