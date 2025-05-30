import React, { useEffect, useState, useRef } from "react";
import Advice from "./Advice";
import Button from "./Boutton";
import { motion, useScroll } from "motion/react";
const App = () => {
  const [objAdvices, seObjetAdvices] = useState([]);
  const [count, setCount] = useState(0);
  const { scrollYProgress } = useScroll();
  const [isLoading, setIsLoading] = useState(false);
  const [lastAdv, setLastAdv] = useState("");
  async function getAdvice() {
    setIsLoading(true); // début du chargement

    try {
      const res = await fetch(
        `https://api.adviceslip.com/advice?timestamp=${Date.now()}`
      );

      const data = await res.json();
      const adv = data.slip.advice;
      if (lastAdv !== adv) {
        seObjetAdvices((prev) => [{ advice: adv }, ...prev]);
        setCount((c) => c + 1);
        setLastAdv(adv);
      }
    } catch (error) {
      console.error("Erreur API :", error);
    } finally {
      setIsLoading(false); // fin du chargement, succès ou erreur
    }
  }
  const didFetch = useRef(false);

  useEffect(() => {
    if (!didFetch.current) {
      didFetch.current = true;
      getAdvice();
    }
  }, []);

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          originX: 0,
          backgroundColor: "#ff880e",
          zIndex: 99,
        }}
      />
      <div className="py-6 max-w-xl mx-auto  space-y-6 bg-white shadow-md rounded-lg">
        <div className="max-w-[98%] mx-auto  relative mt-0 p-6 px-2  border rounded-lg shadow-sm bg-gray-800 border-gray-700">
          <div className="absolute right-2 -top-2  inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-gray-700 bg-stone-300 border-2 border-white rounded-full  dark:border-gray-900">
            <a
              onClick={() => {
                seObjetAdvices([]);
                setCount(0);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </a>
          </div>
          <div className="absolute left-2 -top-2  inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-gray-700 bg-stone-300 border-2 border-white rounded-full  dark:border-gray-900">
            {count}
          </div>
          <Advice
            className="min-h-[100px] mb-3 text-white"
            // msg={objAdvices.length > 0 ? objAdvices[0].advice : ""}
            msg={objAdvices[0]?.advice}
          />

          <Button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
            onClick={getAdvice}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Get Advice"}
          </Button>

          {objAdvices.map((obj, i) => (
            <motion.p
              key={`${i}-${obj.advice}`}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => {
                seObjetAdvices((prev) => {
                  // Supprime l'élément cliqué de sa position actuelle
                  const filtered = prev.filter((a) => a.advice !== obj.advice);
                  //console.log(filtered.length);
                  setCount(filtered.length + 1);
                  // Ajoute l'élément cliqué en haut
                  return [obj, ...filtered];
                });
              }}
              className={`cursor-pointer border-l-4 pl-3 italic mt-2 mb-2 font-normal text-gray-300 dark:text-gray-300 min-h-10 shadow-md hover:shadow-xl transition-shadow duration-300 ${
                i % 2 === 0 ? "border-blue-400" : "border-orange-200"
              }`}
            >
              {obj.advice}
            </motion.p>
          ))}
        </div>

        {/* <ul className="list-disc list-inside text-left text-gray-700">
        {advices.map((adv, i) => (
          <li key={i}>{adv}</li>
        ))}
      </ul> */}
      </div>
    </>
  );
};

export default App;
