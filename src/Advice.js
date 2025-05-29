import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Advice({ msg, children, ...props }) {
  const defaultProps = {
    className: "card",
    role: "article",
  };

  function speak(text) {
    const synth = window.speechSynthesis;
    if (!synth)
      return alert("Synthèse vocale non prise en charge dans ce navigateur.");

    const voices = synth.getVoices();

    // Essaye de trouver une voix anglaise
    const englishVoice = voices.find(
      (voice) =>
        voice.lang.startsWith("en") &&
        voice.name.toLowerCase().includes("english")
    );

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    if (englishVoice) utter.voice = englishVoice;

    synth.cancel(); // stoppe tout speech précédent
    synth.speak(utter);
  }

  return (
    <motion.div
      key={msg}
      {...props}
      initial={{ opacity: 0, filter: "blur(4px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-100 dark:text-white">
        {msg}
      </h4>
      {msg && (
        <button
          onClick={() => speak(msg)}
          className="mt-4 float-right  flex items-center text-blue-600 hover:text-blue-200 transition-colors duration-200"
          aria-label="Écouter le conseil"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5l-7 7h4v6h6v-6h4l-7-7z"
            />
          </svg>
          <span> Listen to the advice</span>
        </button>
      )}
      <span>{children}</span>
    </motion.div>
  );
}
