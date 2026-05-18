// App.jsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  Float,
  Environment,
  OrbitControls,
} from "@react-three/drei";

const bikes = [
  {
    id: 1,
    name: "Falcon X",
    tag: "Urban Folding Bike",
    price: "$2850",
    color: "#2E356B",
    accent: "#FF6B5F",
    description:
      "Built for premium urban mobility with lightweight futuristic engineering.",
  },

  {
    id: 2,
    name: "Raven Pro",
    tag: "Performance Edition",
    price: "$3150",
    color: "#111111",
    accent: "#49B6FF",
    description:
      "High performance folding cycle designed for speed and comfort.",
  },

  {
    id: 3,
    name: "Aero Glide",
    tag: "Minimal Smart Bike",
    price: "$3990",
    color: "#7f7777",
    accent: "#111111",
    description:
      "Clean minimal design combined with intelligent riding dynamics.",
  },
];

function BikeModel({ color }) {
  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
      <group rotation={[0, -0.4, 0]}>
        {/* Frame */}

        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.7, 0.15, 0.15]} />
          <meshStandardMaterial color={color} />
        </mesh>

        {/* Seat */}

        <mesh position={[-0.8, 0.85, 0]}>
          <boxGeometry args={[0.35, 0.1, 0.5]} />
          <meshStandardMaterial color="#ff5e57" />
        </mesh>

        {/* Handle */}

        <mesh position={[1, 0.85, 0]}>
          <boxGeometry args={[0.5, 0.08, 0.08]} />
          <meshStandardMaterial color="#222" />
        </mesh>

        {/* Wheels */}

        <mesh position={[-1.25, -0.75, 0]}>
          <torusGeometry args={[0.75, 0.08, 20, 100]} />
          <meshStandardMaterial color="#111" />
        </mesh>

        <mesh position={[1.25, -0.75, 0]}>
          <torusGeometry args={[0.75, 0.08, 20, 100]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      </group>
    </Float>
  );
}

export default function App() {
  const [index, setIndex] = useState(0);

  const bike = bikes[index];

  const nextBike = () => {
    setIndex((prev) => (prev + 1) % bikes.length);
  };

  const prevBike = () => {
    setIndex((prev) => (prev - 1 + bikes.length) % bikes.length);
  };

  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e) => {
      if (isScrolling) return;

      isScrolling = true;

      if (e.deltaY > 0) {
        nextBike();
      } else {
        prevBike();
      }

      setTimeout(() => {
        isScrolling = false;
      }, 1200);
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-[#f7f7f7] relative font-sans">
      {/* NAVBAR */}

      <nav className="absolute top-0 left-0 w-full z-50 px-6 md:px-12 py-7 flex items-center justify-between">
        {/* LOGO */}

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold">
            B
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight">
              BirdCycles
            </h1>

            <p className="text-xs text-white -mt-1">
              Premium Urban Mobility
            </p>
          </div>
        </motion.div>

        {/* MENU */}

        {/* <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-black transition">
            Bikes
          </a>

          <a href="#" className="hover:text-black transition">
            Technology
          </a>

          <a href="#" className="hover:text-black transition">
            Delivery
          </a>

          <a href="#" className="hover:text-black transition">
            Contact
          </a>
        </div> */}
      </nav>

      {/* MAIN SECTION */}

      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* LEFT SIDE */}

        <motion.div
          animate={{
            backgroundColor: bike.color,
          }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden flex flex-col justify-between px-7 md:px-14 py-28 md:py-16"
        >
          {/* BACKGROUND TEXT */}

          <motion.h1
            key={bike.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.06, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute text-[7rem] md:text-[15rem] font-black text-white top-20 left-0 md:left-5 leading-none pointer-events-none"
          >
            BIRD
          </motion.h1>

          {/* TOP CONTENT */}

          <div className="relative z-10 mt-12 md:mt-20">
            <motion.p
              key={bike.tag}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="uppercase tracking-[5px] text-white/60 text-xs md:text-sm"
            >
              {bike.tag}
            </motion.p>

            <motion.h2
              key={bike.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-white text-5xl md:text-7xl font-black mt-4 leading-none"
            >
              {bike.name}
            </motion.h2>

            <motion.p
              key={bike.description}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.2 }}
              className="text-white/70 mt-8 max-w-lg text-sm md:text-lg leading-relaxed"
            >
              {bike.description}
            </motion.p>
          </div>

          {/* PRICE */}

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
            <div>
              <p className="text-white/60 text-sm">
                Starting From
              </p>

              <h3 className="text-5xl md:text-6xl font-black text-white mt-1">
                {bike.price}
              </h3>
            </div>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              style={{
                backgroundColor: bike.accent,
              }}
              className="px-8 py-5 rounded-2xl text-white font-semibold shadow-2xl w-fit"
            >
              Configure Bike
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}

        <div className="relative flex items-center justify-center overflow-hidden">
          {/* CONFIG PANEL */}

          <div className="absolute top-28 right-1 md:right-1 z-30 hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/0 backdrop-blur-xl border border-white rounded-[30px] p-8 shadow-2xl w-[300px]"
            >
              <p className="text-sm uppercase tracking-[4px] text-gray-400">
                Bike Configuration
              </p>

              <h2 className="text-4xl font-black text-[#111] mt-4 leading-tight">
                Crafted
                <br />
                for cities
              </h2>

              {/* OPTIONS */}
{/* 
              <div className="grid grid-cols-4 gap-4 mt-10">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="aspect-square rounded-2xl border border-gray-200 hover:bg-black hover:text-white transition cursor-pointer flex items-center justify-center"
                  >
                    ⚙️
                  </div>
                ))}
              </div> */}

              {/* FEATURES */}

              <div className="mt-10 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Carbon Frame
                  </span>

                  <span className="font-semibold">Included</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Smart Lock
                  </span>

                  <span className="font-semibold">Enabled</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Battery Range
                  </span>

                  <span className="font-semibold">70km</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 3D BIKE */}

          <AnimatePresence mode="wait">
            <motion.div
              key={bike.id}
              initial={{
                opacity: 0,
                scale: 0.7,
                x: 200,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.7,
                x: -200,
              }}
              transition={{
                duration: 0.9,
              }}
              className="w-full h-full"
            >
              <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
                <ambientLight intensity={1.5} />

                <directionalLight
                  position={[5, 5, 5]}
                  intensity={2}
                />

                <BikeModel color={bike.color} />

                <Environment preset="city" />

                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={1}
                />
              </Canvas>
            </motion.div>
          </AnimatePresence>

          {/* BIKE SELECTOR */}

          <div className="absolute bottom-6 md:bottom-10 flex flex-wrap justify-center gap-4 px-6 z-30">
            {bikes.map((item, i) => (
              <motion.div
                whileHover={{
                  y: -8,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                key={item.id}
                onClick={() => setIndex(i)}
                className={`cursor-pointer rounded-3xl px-6 py-5 transition-all duration-500 border backdrop-blur-xl ${
                  i === index
                    ? "bg-black text-white border-black"
                    : "bg-white/70 border-gray-200 text-black"
                }`}
              >
                <p className="font-bold">{item.name}</p>

                <p
                  className={`text-xs mt-1 ${
                    i === index
                      ? "text-white/60"
                      : "text-gray-500"
                  }`}
                >
                  {item.price}
                </p>
              </motion.div>
            ))}
          </div>

          {/* SCROLL TEXT */}

          <div className="absolute left-1/2 -translate-x-1/2 bottom-32 hidden md:flex flex-col items-center gap-3 text-gray-400">
            <div className="w-[1px] h-14 bg-gray-300"></div>

            <p className="uppercase tracking-[4px] text-xs">
              Scroll
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}