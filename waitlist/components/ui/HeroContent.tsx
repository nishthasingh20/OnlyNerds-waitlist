import { motion } from "framer-motion"
import { WaitlistDialog } from "./waitlist-dialog"

export function HeroContent() {
  return (
    <div className="text-white px-4 max-w-screen-xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-center py-16">
      <motion.div 
        className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-8 lg:mb-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1 
          className="funnel-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {"Learn & Earn"}
          <br />
          Web3 Education
        </motion.h1>
        <motion.div 
          className="funnel-font text-sm text-gray-300 opacity-90 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          LEARN \ CREATE \ FORK \ EARN \ GROW
        </motion.div>
      </motion.div>

      <motion.div 
        className="w-full lg:w-1/2 pl-0 lg:pl-8 flex flex-col items-start pointer-events-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.p 
          className="funnel-font text-base sm:text-lg opacity-80 mb-6 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          The first decentralized learning platform where you can learn, create, fork courses, and earn NFTs
        </motion.p>
        <motion.div 
          className="flex w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <WaitlistDialog
            trigger={
              <motion.button 
                className="funnel-font bg-accent hover:bg-accent/90 text-black bg-white font-semibold py-3.5 px-8 rounded-2xl transition-all duration-300 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Waitlist
              </motion.button>
            }
          />
        </motion.div>
      </motion.div>
    </div>
  )
}