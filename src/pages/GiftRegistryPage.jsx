import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Divider from "../components/ui/Divider";
import { trackPageView, trackClick } from "../services/analytics";

const DEFAULT_REGISTRIES = [
  {
    name: "Amazon",
    url: "https://www.amazon.in/wedding/registry",
    description: "Home essentials & more",
  },
  {
    name: "MyRegistry",
    url: "https://www.myregistry.com",
    description: "Universal gift registry",
  },
];

const GiftRegistryPage = () => {
  const [registries, setRegistries] = useState(DEFAULT_REGISTRIES);

  useEffect(() => {
    trackPageView("Gift Registry");
    try {
      const stored = localStorage.getItem("giftRegistries");
      if (stored) setRegistries(JSON.parse(stored));
    } catch {
      // use defaults
    }
  }, []);

  return (
    <section className="min-h-screen bg-batik-cream batik-bg pt-28 pb-20">
      <div className="max-w-screen-sm mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <h1
            className="text-5xl lg:text-6xl text-[#D4993D] mb-4"
            style={{ fontFamily: "'Cormorant SC', serif", fontWeight: 600 }}
          >
            Gift Registry
          </h1>
          <Divider motif="floral" className="my-6" />
          <p
            className="text-lg text-primary-500 leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Your presence at our wedding is the greatest gift of all. However,
            if you wish to honour us with a gift, we have registered at the
            following places.
          </p>
        </motion.div>

        <div className="space-y-4">
          {registries.map((registry, index) => (
            <motion.a
              key={registry.name}
              href={registry.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackClick("Gift Registry Link", { registry: registry.name })
              }
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group flex items-center justify-between bg-white border border-[#D4993D]/20 px-8 py-6 transition-all duration-300 hover:border-[#D4993D]/50 hover:shadow-sm"
            >
              <div>
                <h3 className="text-xl font-display font-semibold text-primary-600 group-hover:text-[#D4993D] transition-colors">
                  {registry.name}
                </h3>
                <p className="text-sm text-primary-400 mt-1">
                  {registry.description}
                </p>
              </div>
              <ExternalLink
                size={18}
                className="text-primary-300 group-hover:text-[#D4993D] transition-colors flex-shrink-0 ml-4"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftRegistryPage;
