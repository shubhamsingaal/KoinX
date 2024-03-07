import { useState, useEffect } from "react";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function SuggestionSection() {
  const [cryptoData, setCryptoData] = useState([]);
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const controls = useAnimation();

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 3 } },
  };

  useEffect(() => {
    if (inView) {
      // Start animation when the section is in view
      controls.start({ opacity: 1 });
    }
  }, [inView, controls]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((response) => {
        setCryptoData(response.data.coins);
        console.log(response.data.coins);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <motion.div
      className="bg-white h-max mt-10 lg:p-14 p-8"
      variants={fadeInVariants}
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      <div>
        <div className="text-[#202020] text-2xl font-semibold">
          You May Also Like
        </div>

        <div className="mt-4 flex justify-between  overflow-auto  ">
          {(cryptoData as any[]).slice(0, 5).map((crypto, index) => (
            <CryptoCard key={index} cryptoData={crypto.item} />
          ))}
        </div>

        <div className="text-[#202020] text-2xl font-semibold mt-6">
          Trending Coins
        </div>
        <div className="mt-4 flex justify-between overflow-x-auto">
          {(cryptoData as any[]).slice(1, 6).map((crypto, index) => (
            <CryptoCard key={index} cryptoData={crypto.item} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CryptoCard({ cryptoData }: any) {
  console.log("Sparkline URL:", cryptoData.sparkline);

  return (
    <div className="lg:w-[300px] rounded-2xl p-5 border-2 my-2 mr-2">
      <div className="flex items-center space-x-2">
        <img
          src={cryptoData.large}
          alt={cryptoData.name}
          className="w-6 h-6 rounded-full"
        />
        <span className="text-[16px] font-normal">{cryptoData.name}</span>
        <span
          className={`text-${
            cryptoData.data.price_change_percentage_24h.usd > 0
              ? "green"
              : "red"
          }-500 bg-${
            cryptoData.data.price_change_percentage_24h.usd > 0
              ? "#0AB27D"
              : "#FF0000"
          }/10 text-xs font-normal pr-10`}
        >
          {cryptoData.data.price_change_percentage_24h.usd.toFixed(2)}%
        </span>
      </div>
      <div className="text-xl text-[#171717] font-medium mt-2">
        {cryptoData.data.price}
      </div>
      {/* Display the chart image */}

      <img
        src={
          cryptoData && cryptoData.sparkline
            ? cryptoData.sparkline
            : "https://www.coingecko.com/coins/33566/sparkline.svg"
        }
        alt={cryptoData && cryptoData.name ? cryptoData.name : ""}
        className="w-full h-20"
      />
    </div>
  );
}

export default SuggestionSection;
