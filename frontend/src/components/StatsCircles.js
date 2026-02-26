import { motion } from 'framer-motion';

const StatsCircles = ({ stats }) => {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center">
      {/* Background bokeh effect */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-[20%] w-16 h-16 md:w-24 md:h-24 rounded-full blur-[40px] bg-blue-500/60"></div>
        <div className="absolute bottom-20 right-[25%] w-20 h-20 md:w-32 md:h-32 rounded-full blur-[50px] bg-emerald-500/40"></div>
        <div className="absolute top-1/2 left-[10%] w-12 h-12 md:w-16 md:h-16 rounded-full blur-[30px] bg-amber-500/50"></div>
        <div className="absolute top-20 right-[15%] w-16 h-16 md:w-20 md:h-20 rounded-full blur-[35px] bg-purple-500/50"></div>
      </div>

      {/* SVG Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none dark:stroke-slate-700/30 stroke-gray-300/50" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          d="M 50% 50% C 35% 50%, 30% 35%, 25% 25%"
          fill="none"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          d="M 50% 50% C 65% 50%, 70% 35%, 75% 25%"
          fill="none"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          d="M 50% 50% C 50% 65%, 50% 70%, 50% 80%"
          fill="none"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
      </svg>

      {/* Center Circle - Total */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', delay: 0.2 }}
        className="absolute flex flex-col items-center justify-center z-20"
      >
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border dark:border-white/5 border-gray-200 dark:bg-surface-dark/30 bg-white/50 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.3)] relative group">
          <div className="absolute inset-0 rounded-full border border-primary/20 scale-110 opacity-0 group-hover:scale-125 group-hover:opacity-100 transition-all duration-700"></div>
          <span className="text-[10px] md:text-sm font-medium dark:text-slate-400 text-gray-500 tracking-wider uppercase mb-1">Total Requests</span>
          <h1 className="text-4xl md:text-7xl font-light dark:text-white text-gray-900 tracking-tighter text-glow">{stats.total}</h1>
          
        </div>
      </motion.div>

      {/* Top Left - Approved */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, type: 'spring' }}
        className="absolute top-[15%] left-[15%] md:left-[20%] transform hover:-translate-y-2 transition-transform duration-500 cursor-default z-20"
      >
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-5xl font-light text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">
            {stats.approved}
          </span>
          <span className="text-[10px] md:text-xs font-medium text-emerald-500/80 uppercase tracking-widest mt-1 md:mt-2">
            Approved
          </span>
          <span className="text-[8px] md:text-[10px] dark:text-slate-500 text-gray-400 hidden md:block">Completed</span>
        </div>
      </motion.div>

      {/* Top Right - Pending */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, type: 'spring' }}
        className="absolute top-[15%] right-[15%] md:right-[20%] transform hover:-translate-y-2 transition-transform duration-500 cursor-default z-20"
      >
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-5xl font-light text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]">
            {stats.pending}
          </span>
          <span className="text-[10px] md:text-xs font-medium text-amber-500/80 uppercase tracking-widest mt-1 md:mt-2">
            Pending
          </span>
          <span className="text-[8px] md:text-[10px] dark:text-slate-500 text-gray-400 hidden md:block">Action Needed</span>
        </div>
      </motion.div>

      {/* Bottom - Rejected */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7, type: 'spring' }}
        className="absolute bottom-[10%] transform hover:-translate-y-2 transition-transform duration-500 cursor-default z-20"
      >
        <div className="flex flex-col items-center">
          <span className="text-2xl md:text-4xl font-light text-red-400/80 drop-shadow-[0_0_15px_rgba(248,113,113,0.3)]">
            {stats.rejected}
          </span>
          <span className="text-[10px] md:text-xs font-medium text-red-500/60 uppercase tracking-widest mt-1 md:mt-2">
            Declined
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default StatsCircles;
