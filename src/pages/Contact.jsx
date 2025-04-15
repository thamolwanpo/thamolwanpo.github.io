// src/pages/Research.jsx
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <motion.div
      className="min-h-screen bg-white text-black p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-4xl font-bold mb-4">About My Research</h1>
      <p className="text-lg max-w-2xl">
        I'm a machine learning researcher focusing on natural language processing, AI for climate policy, and social impact. This is a placeholder page where I'll later include my research interests, publications, and academic background.
      </p>
    </motion.div>
  );
}
