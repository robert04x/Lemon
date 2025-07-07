import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Clock, MapPin, Phone, Mail, Diamond as Lemon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Background3D from '../components/Background3D';
import logo from '/src/Lemon Logo - Final.png'

const SimpleLogo = () => {
  return (
    <div className="mb-8">
      <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-white shadow-md mx-auto">
        <img
          src={logo}
          className="w-12 h-12 object-contain"
        />
      </div>
    </div>
  );
};

const TikTokButton = () => {
  return (
    <motion.a
      href="https://www.tiktok.com/@lemon_restaurant"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1, duration: 0.8, type: "spring" }}
      whileHover={{ 
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
    >
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="w-8 h-8 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.26z"/>
        </svg>
      </motion.div>
      
      {/* Pulse effect */}
      <motion.div
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-black rounded-full -z-10"
      />
    </motion.a>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gyroX = useMotionValue(0);
  const gyroY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springConfig);
  
  // Gyroscope-based rotation for mobile
  const gyroRotateX = useSpring(gyroX, springConfig);
  const gyroRotateY = useSpring(gyroY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Gyroscope effect for mobile devices
  useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma !== null && event.beta !== null) {
        // Normalize the values and apply some damping
        const normalizedGamma = Math.max(-30, Math.min(30, event.gamma)) / 30;
        const normalizedBeta = Math.max(-30, Math.min(30, event.beta)) / 30;
        
        gyroX.set(normalizedBeta * 5); // Reduced intensity
        gyroY.set(normalizedGamma * 5);
      }
    };

    // Check if device orientation is supported
    if (window.DeviceOrientationEvent) {
      // Request permission for iOS 13+
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission()
          .then((response: string) => {
            if (response === 'granted') {
              window.addEventListener('deviceorientation', handleDeviceOrientation);
            }
          })
          .catch(console.error);
      } else {
        // For other devices
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    }

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [gyroX, gyroY]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        navigate('/menu');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigate]);

  // Detect if user is on mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Background3D />
        
        <motion.div
          ref={containerRef}
          style={{
            perspective: 1000,
            transformStyle: 'preserve-3d'
          }}
          className="relative text-center px-4 z-30 max-w-4xl mx-auto"
        >
          <motion.div
            style={{
              rotateX: isMobile ? gyroRotateX : rotateX,
              rotateY: isMobile ? gyroRotateY : rotateY,
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="bg-white bg-opacity-85 p-6 sm:p-8 lg:p-[25px] rounded-lg shadow-lg space-y-1 sm:space-y-2" style={{ transform: 'translateZ(50px)' }}>
              <SimpleLogo />
              
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl sm:text-6xl lg:text-8xl font-serif font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-yellow-400 drop-shadow-[0_4px_8px_rgba(251,191,36,0.3)]"
              >
                LEMON
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-lg sm:text-2xl lg:text-3xl font-serif text-yellow-600 tracking-widest uppercase"
              >
                restaurant
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-xs sm:text-sm text-yellow-500 tracking-wider uppercase"
              >
                by Romeo
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="text-sm sm:text-lg lg:text-2xl mt-4 sm:mt-8 mb-6 sm:mb-12 text-yellow-700 font-serif italic max-w-2xl mx-auto px-4"
              >
                Unde "doar o gustare" devine "trei feluri si un desert"
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="pt-4"
              >
                <Link
                  to="/menu"
                  className="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                >
                  Vezi meniul nostru
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-30"
        >
          {/* Mobile layout - 2x2 grid */}
          <div className="block sm:hidden px-4">
            <div className="grid grid-cols-2 gap-2 text-yellow-700 text-xs">
              {[
                { icon: Clock, text: "08:00-00:00" },
                { icon: MapPin, text: "Gorneni, Giurgiu" },
                { icon: Phone, text: "0733368272" },
                { icon: Mail, text: "lemonrestaurant@yahoo.com" }
              ].map(({ icon: Icon, text }, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 + index * 0.1 }}
                  className="flex items-center space-x-1 bg-white bg-opacity-80 rounded-lg p-2"
                >
                  <Icon className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                  <span className="truncate">{text}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Desktop layout - horizontal */}
          <div className="hidden sm:flex justify-center space-x-12 text-yellow-700">
            {[
              { icon: Clock, text: "Program 08:00-00:00" },
              { icon: MapPin, text: "Gorneni, Giurgiu" },
              { icon: Phone, text: "0733368272" },
              { icon: Mail, text: "lemonrestaurant@yahoo.com" }
            ].map(({ icon: Icon, text }, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <Icon className="h-5 w-5 text-yellow-500" />
                <span>{text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      <TikTokButton />
    </div>
  );
}

export default Home;