import React from "react";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: 1,
    title: "Rahasia di Balik Aroma Kopi",
    image: "/src/assets/blog1.jpeg",
    content:
      "Aroma kopi yang khas berasal dari proses pemanggangan biji kopi. Setiap tingkat sangrai menciptakan karakter unik — dari aroma manis karamel hingga pahit yang menenangkan.",
  },
  {
    id: 2,
    title: "Kata Kopi",
    image: "/src/assets/blog2.jpeg",
    content:
      "Kopi tak pernah memilih siapa yang menikmatinya — ia menyatukan semua cerita, dari yang sibuk mengejar mimpi hingga yang diam menatap senja.",
  },
  {
    id: 3,
    title: "Kenapa Kopi Bisa Bikin Bahagia?",
    image: "/src/assets/blog3.jpeg",
    content:
      "Selain kafein yang bikin semangat, kopi juga jadi alasan sederhana untuk berhenti sejenak — dan menikmati momen bersama seseorang yang istimewa.",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3e5ab] to-[#d9b382] px-6 md:px-12 py-16 text-[#3b2f2f] font-poppins">
      <h1 className="text-4xl font-bold text-center text-[#4b2e05] mb-12">
        ☕ Blog Kopi Leker
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-[#4b2e05] mb-2">
                {post.title}
              </h3>
              <p className="text-[#5a4633] text-sm leading-relaxed">
                {post.content}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
