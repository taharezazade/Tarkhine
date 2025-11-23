import { Link } from "react-router-dom";
import { TickSquare, ShieldTick, Truck, Star1 } from "iconsax-react";
import { useState } from "react";
import { motion } from "framer-motion";

// Import animation variants
import {
  fadeUp,
  staggerContainer,
  cardVariant,
  imageParallax,
  statsVariant,
} from "/animations/RepresentationVariants";

// Sample data
const sampleData = [
  {
    id: 1,
    title: "Premium Quality",
    description:
      "Our products are carefully crafted with the highest standards. Each dish is prepared with attention to detail, ensuring a delightful culinary experience.",
    image: "/image/Premium Quality.jpg",
  },
  {
    id: 2,
    title: "Fast Delivery",
    description:
      "We deliver your orders quickly and safely. Thanks to our optimized logistics system, your meals arrive fresh and on time.",
    image: "/image/Fast Delivery.jpg",
  },
  {
    id: 3,
    title: "Fresh Ingredients",
    description:
      "Only the freshest ingredients are used to create our dishes. Natural, high-quality produce ensures a rich taste in every bite.",
    image: "/image/Fresh Ingredients.jpg",
  },
  {
    id: 4,
    title: "Customer Satisfaction",
    description:
      "Our priority is your satisfaction. We provide 24/7 support and listen to your feedback to constantly improve our service.",
    image: "/image/Customer Satisfaction.jpg",
  },
];

export default function Representation() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <motion.div
      className="sm:px-10 py-16 text-white"
      variants={staggerContainer}
      initial="hidden"
      animate="visible">
      {/* Header */}
      <motion.header className="text-center mb-14" variants={fadeUp}>
        <h1 className="text-5xl sm:text-6xl font-bold text-[#ff7d5d] mb-4">
          Representation
        </h1>
        <p className="text-white/70 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
          Explore the core values and features that make our service
          exceptional. Each section below showcases the dedication, quality, and
          care we put into every aspect of our offerings.
        </p>
      </motion.header>

      {/* Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
        {sampleData.map((item) => (
          <motion.div
            key={item.id}
            className={`bg-base-300 p-3 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl`}
            variants={cardVariant}
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}>
            <motion.div
              className="w-full h-48 overflow-hidden"
              variants={imageParallax}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full grayscale-100 object-cover rounded-xl object-center"
              />
            </motion.div>

            <div className="flex py-3 flex-col items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-secondary">
                {item.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed text-center">
                {item.description}
              </p>
            </div>

            <Link
              to="/menu"
              className="btn bg-success w-fit hover:bg-[#ff7d5d] text-black mx-auto">
              Read More
            </Link>
          </motion.div>
        ))}
      </section>

      {/* Stats Section */}
      <motion.section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        variants={staggerContainer}>
        {[
          {
            icon: <TickSquare size="36" color="#ff7d5d" variant="Bold" />,
            num: "120+",
            label: "Satisfied Clients",
          },
          {
            icon: <Truck size="36" color="#ff7d5d" variant="Bold" />,
            num: "350+",
            label: "Orders Delivered",
          },
          {
            icon: <ShieldTick size="36" color="#ff7d5d" variant="Bold" />,
            num: "50+",
            label: "Fresh Ingredients",
          },
          {
            icon: <Star1 size="36" color="#ff7d5d" variant="Bold" />,
            num: "24/7",
            label: "Customer Support",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="bg-base-300 rounded-xl shadow-lg p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300"
            variants={statsVariant}>
            {stat.icon}
            <h2 className="text-3xl font-bold text-[#ff7d5d]">{stat.num}</h2>
            <p className="text-white/70 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* CTA Section */}
      <motion.section className="text-center mt-16" variants={fadeUp}>
        <h2 className="text-4xl font-bold text-[#ff7d5d] mb-4">
          Join Us Today
        </h2>
        <p className="text-white/70 max-w-xl mx-auto mb-6">
          Experience the best quality, fastest delivery, and highest
          satisfaction. Take the first step and explore our menu.
        </p>
        <Link
          to="/menu"
          className="btn btn-lg btn-success text-black hover:bg-[#ff7d5d]/90">
          Explore Menu
        </Link>
      </motion.section>
    </motion.div>
  );
}
