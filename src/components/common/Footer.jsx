import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import content from '../../data/content.json';
import { trackClick, trackExternalLink } from '../../services/analytics';

const Footer = () => {
  const quickLinks = [
    { label: 'RSVP', path: '/rsvp' },
    { label: 'Events Schedule', path: '/events' },
    { label: 'Travel Info', path: '/travel' },
    { label: 'Guest Book', path: '/guestbook' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleSocialClick = (platform, link) => {
    trackExternalLink('Social Media', platform);
    if (!content.socialMedia.isPlaceholder) {
      window.open(link, '_blank');
    }
  };

  const handleWhatsAppClick = (groupName, link) => {
    trackExternalLink('WhatsApp Group', groupName);
    if (!link.includes('placeholder')) {
      window.open(link, '_blank');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-neutral-50 to-primary-50/30 mt-20">
      {/* Decorative wave */}
      <div className="absolute top-0 left-0 right-0 -mt-px">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-20 transform rotate-180"
        >
          <path
            d="M0,96L48,90.7C96,85,192,75,288,58.7C384,43,480,21,576,26.7C672,32,768,64,864,74.7C960,85,1056,75,1152,58.7C1248,43,1344,21,1392,10.7L1440,0L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="url(#gradient)"
            fillOpacity="0.1"
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#FFD6E8" />
              <stop offset="50%" stopColor="#F4E4C1" />
              <stop offset="100%" stopColor="#E8A598" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container-custom mx-auto px-4 pt-16 pb-8"
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Wedding Info */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
              <Heart className="w-6 h-6 text-primary-400 fill-primary-200" />
              <h3 className="text-xl font-serif text-neutral-800">The Wedding</h3>
            </div>
            <div className="space-y-2 text-neutral-600">
              <p className="font-display text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
                {content.wedding.brideName.split(' ')[0]} & {content.wedding.groomName.split(' ')[0]}
              </p>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Calendar size={16} />
                <span>April 24-25, 2026</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin size={16} />
                <span>{content.wedding.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h3 className="text-lg font-serif text-neutral-800 mb-4">Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => trackClick('Footer Link', { page: link.label })}
                  className="block text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h3 className="text-lg font-serif text-neutral-800 mb-4">Contact Us</h3>
            <div className="space-y-3">
              {content.contacts.slice(0, 2).map((contact, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-sm text-neutral-500">{contact.role}</p>
                  <a
                    href={`tel:${contact.phone}`}
                    onClick={() => trackClick('Contact Phone', { role: contact.role })}
                    className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors justify-center md:justify-start"
                  >
                    <Phone size={14} />
                    <span>{contact.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social & WhatsApp */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h3 className="text-lg font-serif text-neutral-800 mb-4">Stay Connected</h3>

            {/* Social Media */}
            <div className="flex gap-3 justify-center md:justify-start mb-4">
              <motion.button
                onClick={() => handleSocialClick('Instagram', `https://instagram.com/${content.socialMedia.instagram}`)}
                className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-all"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={20} className="text-pink-500" />
              </motion.button>
              <motion.button
                onClick={() => handleSocialClick('Facebook', `https://facebook.com/${content.socialMedia.facebook}`)}
                className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-all"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook size={20} className="text-blue-600" />
              </motion.button>
              <motion.button
                onClick={() => handleSocialClick('WhatsApp', content.whatsappGroups[0]?.link)}
                className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-all"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={20} className="text-green-500" />
              </motion.button>
            </div>

            {/* Hashtag */}
            <p className="text-sm text-neutral-500 mb-2">Share your moments</p>
            <p className="font-medium text-primary-600">
              {content.wedding.hashtag}
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="border-t border-neutral-200 pt-8"
        >
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-neutral-500">
                {content.footer.copyright.replace('[Bride]', content.wedding.brideName.split(' ')[0]).replace('[Groom]', content.wedding.groomName.split(' ')[0])}
              </p>
            </div>

            {/* Tagline with animated heart */}
            <motion.div
              className="flex items-center gap-2 text-neutral-600"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-sm font-serif italic">{content.footer.tagline}</span>
              <Heart className="w-4 h-4 text-primary-400 fill-primary-400" />
            </motion.div>

            <div className="text-center md:text-right">
              <p className="text-sm text-neutral-500">
                {content.footer.madeWith}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-5">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Heart size={100} className="text-primary-300" />
        </motion.div>
      </div>
      <div className="absolute bottom-20 right-10 opacity-5">
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Heart size={80} className="text-accent-300" />
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;