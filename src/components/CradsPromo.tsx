import { FaArrowRight } from "react-icons/fa";
import promoimg from "../assets/promoimg.png";
import { motion } from "framer-motion";

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 2 } },
};

function CradsPromo() {
  return (
    <motion.div
      className="mt-4 bg-[#0052FE] text-white h-[515px] rounded-2xl px-10 py-8 ml-4 text-center"
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="">
        <div className="text-2xl px-12">Get Started with KoinX for FREE</div>
        <div className="text-sm mt-4">
          With our range of features that you can equip for free, KoinX allows
          you to be more educated and aware of your tax reports.
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <img src={promoimg} className="w-[178px] h-[166.22px]" alt="Promo" />
      </div>
      <div className="flex justify-center">
        <motion.div
          className="flex justify-center mt-8 bg-white text-[#0F1629] rounded-xl py-3 w-[237px] text-center cursor-pointer hover:bg-gradient-to-r hover:from-[#c6c8cd] hover:to-[#eff0f4] transition-all duration-300"
          variants={fadeInVariants}
        >
          <button className="font-medium">Get Started for FREE</button>
          <div className="ml-4 mt-1">
            <FaArrowRight className="font-thin" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CradsPromo;
