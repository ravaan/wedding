import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Save, GripVertical } from "lucide-react";
import { trackPageView } from "../services/analytics";

const DEFAULT_REGISTRIES = [
  {
    id: "1",
    name: "Amazon",
    url: "https://www.amazon.in/wedding/registry",
    description: "Home essentials & more",
  },
  {
    id: "2",
    name: "MyRegistry",
    url: "https://www.myregistry.com",
    description: "Universal gift registry",
  },
];

const STORAGE_KEY = "giftRegistries";

const loadRegistries = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore parse errors
  }
  return DEFAULT_REGISTRIES;
};

const saveRegistries = (registries) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registries));
};

const GiftRegistryEditPage = () => {
  const [registries, setRegistries] = useState(loadRegistries);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    trackPageView("Gift Registry Editor");
  }, []);

  const handleChange = (id, field, value) => {
    setRegistries((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
    setSaved(false);
  };

  const handleAdd = () => {
    const newEntry = {
      id: Date.now().toString(),
      name: "",
      url: "",
      description: "",
    };
    setRegistries((prev) => [...prev, newEntry]);
    setSaved(false);
  };

  const handleDelete = (id) => {
    setRegistries((prev) => prev.filter((r) => r.id !== id));
    setSaved(false);
  };

  const handleSave = () => {
    saveRegistries(registries);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="min-h-screen bg-batik-cream pt-28 pb-20">
      <div className="max-w-screen-sm mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="text-4xl lg:text-5xl text-[var(--theme-gold)] mb-2 text-center"
            style={{ fontFamily: "'Cormorant SC', serif", fontWeight: 600 }}
          >
            Edit Gift Registry
          </h1>
          <p className="text-sm text-primary-400 text-center mb-12">
            Changes are saved to this browser's local storage.
          </p>

          <div className="space-y-6">
            {registries.map((registry) => (
              <div
                key={registry.id}
                className="bg-white border border-[var(--theme-gold)]/20 p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <GripVertical
                    size={16}
                    className="text-primary-300 flex-shrink-0"
                  />
                  <button
                    onClick={() => handleDelete(registry.id)}
                    className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                    aria-label="Delete entry"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div>
                  <label className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-primary-400 block mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={registry.name}
                    onChange={(e) =>
                      handleChange(registry.id, "name", e.target.value)
                    }
                    placeholder="e.g. Amazon"
                    className="w-full px-3 py-2 border border-primary-200 text-primary-700 text-sm focus:outline-none focus:border-[var(--theme-gold)] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-primary-400 block mb-1">
                    URL
                  </label>
                  <input
                    type="url"
                    value={registry.url}
                    onChange={(e) =>
                      handleChange(registry.id, "url", e.target.value)
                    }
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-primary-200 text-primary-700 text-sm focus:outline-none focus:border-[var(--theme-gold)] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-primary-400 block mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={registry.description}
                    onChange={(e) =>
                      handleChange(registry.id, "description", e.target.value)
                    }
                    placeholder="Short description"
                    className="w-full px-3 py-2 border border-primary-200 text-primary-700 text-sm focus:outline-none focus:border-[var(--theme-gold)] transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-8 gap-4">
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-[var(--theme-gold)] transition-colors cursor-pointer"
            >
              <Plus size={16} />
              Add Entry
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[var(--theme-green)] hover:bg-[var(--theme-green-dark)] text-white text-sm font-bold tracking-wide uppercase px-6 py-3 transition-colors cursor-pointer"
            >
              <Save size={16} />
              {saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GiftRegistryEditPage;
