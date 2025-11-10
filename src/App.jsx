import { useEffect, useMemo, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Instagram, Facebook, Star, Menu as MenuIcon, MapPin, Clock, Mail, ChevronDown, Download, MessageCircle, ChevronLeft, ChevronRight, X } from 'lucide-react'

const WHATSAPP_NUMBER = '+213555000000' // Replace with restaurant number

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      menu: 'Menu',
      gallery: 'Gallery',
      specials: "Chef's Picks",
      reservations: 'Reservations',
      contact: 'Contact',
      testimonials: 'Testimonials',
    },
    hero: {
      title: 'Le Farfalla',
      tagline: 'Authentic Italian Dining in the Heart of Algeria',
      cta: 'Book a Table',
    },
    about: {
      heading: 'Our Story',
      text1:
        'Le Farfalla — meaning “the butterfly” in Italian — celebrates elegance, transformation, and lightness. Our kitchen honors Italy’s timeless culinary traditions with seasonal ingredients, handcrafted pasta, and wood-fired flavors.',
      text2:
        'From the warmth of our olive-hued interiors to the final sip of espresso, we invite you to linger, connect, and savor the art of Italian hospitality.',
    },
    menu: {
      heading: 'Our Menu',
      viewFull: 'View Full Menu (PDF)',
      sections: {
        starters: 'Starters',
        pastas: 'Pastas',
        pizzas: 'Pizzas',
        mains: 'Main Courses',
        desserts: 'Desserts',
        drinks: 'Drinks',
      },
    },
    gallery: { heading: 'Gallery' },
    specials: { heading: 'Specials & Chef’s Picks' },
    reservations: {
      heading: 'Reservations',
      name: 'Full Name',
      phone: 'Phone Number',
      date: 'Date',
      time: 'Time',
      guests: 'Guests',
      submit: 'Request Booking',
      quick: 'Or reach us quickly:',
      note: 'We will confirm your booking by phone or WhatsApp shortly.',
    },
    contact: {
      heading: 'Find Us',
      addressTitle: 'Address',
      hoursTitle: 'Opening Hours',
      contactTitle: 'Contact',
      hours: [
        'Mon–Thu: 12:00 – 23:00',
        'Fri: 13:00 – 23:30',
        'Sat–Sun: 12:00 – 23:30',
      ],
    },
    testimonials: { heading: 'What Our Guests Say' },
    footer: {
      rights: 'All rights reserved.',
      quickLinks: 'Quick Links',
      backToTop: 'Back to Top',
    },
    ctas: { bookNow: 'Book Now', viewMenu: 'View Menu', findUs: 'Find Us' },
    seo: {
      phone: 'Phone',
      email: 'Email',
      instagram: 'Instagram',
      facebook: 'Facebook',
      tiktok: 'TikTok',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      menu: 'القائمة',
      gallery: 'المعرض',
      specials: 'اختيارات الشيف',
      reservations: 'الحجوزات',
      contact: 'اتصل بنا',
      testimonials: 'آراء الزبائن',
    },
    hero: {
      title: 'لي فارفالا',
      tagline: 'مطعم إيطالي أصيل في قلب الجزائر',
      cta: 'احجز طاولة',
    },
    about: {
      heading: 'قصتنا',
      text1:
        'لي فارفالا — وتعني “الفراشة” بالإيطالية — يحتفي بالأناقة والتحوّل والخفة. مطبخنا يكرّم التقاليد الإيطالية الخالدة بمكونات موسمية، ومكرونة مصنوعة يدويًا، ونكهات من فرن الحطب.',
      text2:
        'من دفء التصميم بظلال الزيتون إلى آخر رشفة إسبرسو، ندعوك لتتذوق فن الضيافة الإيطالية وتستمتع بلحظات لا تُنسى.',
    },
    menu: {
      heading: 'قائمتنا',
      viewFull: 'عرض القائمة الكاملة (PDF)',
      sections: {
        starters: 'المقبلات',
        pastas: 'المعكرونة',
        pizzas: 'البيتزا',
        mains: 'الأطباق الرئيسية',
        desserts: 'الحلويات',
        drinks: 'المشروبات',
      },
    },
    gallery: { heading: 'المعرض' },
    specials: { heading: 'العروض واختيارات الشيف' },
    reservations: {
      heading: 'الحجوزات',
      name: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      date: 'التاريخ',
      time: 'الوقت',
      guests: 'عدد الضيوف',
      submit: 'إرسال الطلب',
      quick: 'أو تواصل معنا بسرعة:',
      note: 'سنتواصل معكم لتأكيد الحجز عبر الهاتف أو واتساب قريبًا.',
    },
    contact: {
      heading: 'موقعنا',
      addressTitle: 'العنوان',
      hoursTitle: 'ساعات العمل',
      contactTitle: 'التواصل',
      hours: [
        'الاثنين–الخميس: 12:00 – 23:00',
        'الجمعة: 13:00 – 23:30',
        'السبت–الأحد: 12:00 – 23:30',
      ],
    },
    testimonials: { heading: 'ماذا يقول ضيوفنا' },
    footer: {
      rights: 'جميع الحقوق محفوظة.',
      quickLinks: 'روابط سريعة',
      backToTop: 'العودة للأعلى',
    },
    ctas: { bookNow: 'احجز الآن', viewMenu: 'شاهد القائمة', findUs: 'اعثر علينا' },
    seo: {
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      instagram: 'إنستغرام',
      facebook: 'فيسبوك',
      tiktok: 'تيك توك',
    },
  },
}

const menuData = {
  starters: [
    { name: 'Bruschetta al Pomodoro', desc: 'Toasted bread, tomatoes, basil, olive oil', price: '900 DZD', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop' },
    { name: 'Burrata e Prosciutto', desc: 'Creamy burrata, cured ham, arugula', price: '2,200 DZD', img: 'https://images.unsplash.com/photo-1540712129860-8a5b76a1f2d4?q=80&w=800&auto=format&fit=crop' },
  ],
  pastas: [
    { name: 'Tagliatelle al Ragù', desc: 'Slow-cooked beef ragù, Parmigiano', price: '2,100 DZD', img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=800&auto=format&fit=crop' },
    { name: 'Spaghetti alle Vongole', desc: 'Clams, garlic, white wine, parsley', price: '2,500 DZD', img: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?q=80&w=800&auto=format&fit=crop' },
  ],
  pizzas: [
    { name: 'Margherita D.O.P.', desc: 'San Marzano tomatoes, mozzarella, basil', price: '1,600 DZD', img: 'https://images.unsplash.com/photo-1548365328-8b849e4c4a38?q=80&w=800&auto=format&fit=crop' },
    { name: 'Diavola', desc: 'Spicy salami, fior di latte, chili oil', price: '1,900 DZD', img: 'https://images.unsplash.com/photo-1547106634-56dcd53ae883?q=80&w=800&auto=format&fit=crop' },
  ],
  mains: [
    { name: 'Branzino al Forno', desc: 'Baked sea bass, lemon, herbs', price: '3,800 DZD', img: 'https://images.unsplash.com/photo-1617195737497-5e0bd5f0cc49?q=80&w=800&auto=format&fit=crop' },
    { name: 'Pollo alla Milanese', desc: 'Crispy breaded chicken, salad', price: '2,900 DZD', img: 'https://images.unsplash.com/photo-1505575972945-28054f4b0550?q=80&w=800&auto=format&fit=crop' },
  ],
  desserts: [
    { name: 'Tiramisu', desc: 'Espresso-soaked ladyfingers, mascarpone', price: '1,200 DZD', img: 'https://images.unsplash.com/photo-1609167830220-7166bcb680b9?q=80&w=800&auto=format&fit=crop' },
    { name: 'Panna Cotta', desc: 'Vanilla cream, berry coulis', price: '1,100 DZD', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84d?q=80&w=800&auto=format&fit=crop' },
  ],
  drinks: [
    { name: 'Espresso', desc: 'Single shot Italian espresso', price: '400 DZD', img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop' },
    { name: 'Limonata', desc: 'Fresh lemon soda', price: '600 DZD', img: 'https://images.unsplash.com/photo-1568440462986-8d2020b6f6b1?q=80&w=800&auto=format&fit=crop' },
  ],
}

const testimonials = [
  {
    name: 'Sofia R.',
    text: 'Elegant atmosphere and the most delicious pasta. A perfect spot for special evenings.',
    rating: 5,
  },
  {
    name: 'Yacine M.',
    text: 'Authentic flavors and warm service. The pizza crust is perfection.',
    rating: 5,
  },
  {
    name: 'Lina B.',
    text: 'Loved the desserts and the olive-green interiors. Will definitely come again!',
    rating: 4,
  },
]

function useLang() {
  const [lang, setLang] = useState('en')
  const t = useMemo(() => translations[lang], [lang])
  useEffect(() => {
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en'
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.classList.add('scroll-smooth')
  }, [lang])
  return { lang, setLang, t }
}

function SectionHeading({ children }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-serif tracking-tight text-olive-900 mb-6"
    >
      {children}
    </motion.h2>
  )
}

function Nav({ t, onToggleLang, lang }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const items = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#menu', label: t.nav.menu },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#specials', label: t.nav.specials },
    { href: '#reservations', label: t.nav.reservations },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <motion.div
      animate={{ backgroundColor: scrolled ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.55)', boxShadow: scrolled ? '0 6px 20px rgba(0,0,0,0.06)' : '0 0 0 rgba(0,0,0,0)' }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-olive-100"
      transition={{ duration: 0.35 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2">
            <span className="text-2xl font-serif text-olive-900">Le Farfalla</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            {items.map((it) => (
              <a key={it.href} href={it.href} className="text-olive-800 hover:text-olive-900 transition">
                {it.label}
              </a>
            ))}
            <a href="#reservations" className="ml-2 inline-flex items-center rounded-full bg-gold-600 text-white px-4 py-2 hover:bg-gold-700 transition shadow-[0_0_0_0_rgba(199,156,72,0.7)] hover:shadow-[0_0_25px_6px_rgba(199,156,72,0.35)] duration-300">
              {t.ctas.bookNow}
            </a>
            <LangSwitcher lang={lang} onToggle={onToggleLang} />
          </div>
          <button className="md:hidden p-2 rounded hover:bg-olive-50" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <MenuIcon className="w-6 h-6 text-olive-900" />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {items.map((it) => (
            <a key={it.href} href={it.href} className="block py-2 text-olive-800" onClick={() => setOpen(false)}>
              {it.label}
            </a>
          ))}
          <div className="flex items-center justify-between pt-2">
            <a href="#reservations" className="inline-flex items-center rounded-full bg-gold-600 text-white px-4 py-2 hover:bg-gold-700 transition">
              {t.ctas.bookNow}
            </a>
            <LangSwitcher lang={lang} onToggle={onToggleLang} />
          </div>
        </div>
      )}
    </motion.div>
  )
}

function LangSwitcher({ lang, onToggle }) {
  return (
    <button onClick={onToggle} className="inline-flex items-center gap-2 rounded-full border border-olive-200 px-3 py-1 text-olive-900 hover:bg-olive-50">
      <span className="text-sm font-medium">{lang === 'en' ? 'AR' : 'EN'}</span>
      <ChevronDown className="w-4 h-4" />
    </button>
  )
}

function Hero({ t }) {
  return (
    <section id="home" className="relative h-[92vh] min-h-[560px] flex items-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10"
        autoPlay
        playsInline
        muted
        loop
        poster="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1600&auto=format&fit=crop"
        src="https://videos.pexels.com/video-files/3182791/3182791-uhd_2560_1440_25fps.mp4"
      />
      <div className="absolute inset-0 -z-10 bg-black/35" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-gold-600" />
            <span className="text-sm text-olive-900">Le Farfalla</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif text-white tracking-tight drop-shadow-md"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-4 text-lg md:text-xl text-white/90 max-w-xl"
          >
            {t.hero.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#reservations" className="inline-flex items-center rounded-full bg-gold-600 text-white px-6 py-3 hover:bg-gold-700 transition shadow-[0_0_0_0_rgba(199,156,72,0.7)] hover:shadow-[0_0_35px_10px_rgba(199,156,72,0.35)] duration-300">
              {t.hero.cta}
            </a>
            <a href="#menu" className="inline-flex items-center rounded-full bg-white/90 text-olive-900 px-6 py-3 hover:bg-white transition">
              {translations.en.ctas.viewMenu}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function About({ t }) {
  return (
    <section id="about" className="bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
            <SectionHeading>{t.about.heading}</SectionHeading>
            <p className="text-olive-900/90 leading-relaxed mb-4">{t.about.text1}</p>
            <p className="text-olive-900/90 leading-relaxed">{t.about.text2}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
            <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop" alt="Italian dining interior" className="rounded-xl shadow-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function MenuSection({ t }) {
  const sections = [
    ['starters', menuData.starters],
    ['pastas', menuData.pastas],
    ['pizzas', menuData.pizzas],
    ['mains', menuData.mains],
    ['desserts', menuData.desserts],
    ['drinks', menuData.drinks],
  ]

  return (
    <section id="menu" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <SectionHeading>{t.menu.heading}</SectionHeading>
        <div className="grid md:grid-cols-2 gap-10">
          {sections.map(([key, items]) => (
            <div key={key}>
              <h3 className="text-xl font-serif text-olive-900 mb-4">
                {t.menu.sections[key]}
              </h3>
              <ul className="space-y-4">
                {items.map((it, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.03 }}
                    className="group flex items-center gap-3 border-b border-olive-100 pb-3"
                  >
                    <div className="relative overflow-hidden rounded-md shadow-sm">
                      <img src={it.img} alt={it.name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-olive-900">{it.name}</p>
                          <p className="text-sm text-olive-700">{it.desc}</p>
                        </div>
                        <span className="text-olive-900 font-semibold whitespace-nowrap">{it.price}</span>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <a href="/menu.pdf" target="_blank" className="inline-flex items-center gap-2 rounded-full border border-olive-300 px-4 py-2 text-olive-900 hover:bg-olive-50">
            <Download className="w-4 h-4" /> {t.menu.viewFull}
          </a>
        </div>
      </div>
    </section>
  )
}

function Gallery({ t }) {
  const images = [
    'https://images.unsplash.com/photo-1604908176997-431651c1fd3d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600880292089-90e5d7a9b1dd?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542089363-7d9b7f2e6f5d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1521389508051-d7ffb5dc8bbf?q=80&w=1200&auto=format&fit=crop',
  ]
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })
  const open = (idx) => setLightbox({ open: true, index: idx })
  const close = () => setLightbox({ open: false, index: 0 })
  const prev = () => setLightbox((s) => ({ open: true, index: (s.index - 1 + images.length) % images.length }))
  const next = () => setLightbox((s) => ({ open: true, index: (s.index + 1) % images.length }))

  return (
    <section id="gallery" className="bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <SectionHeading>{t.gallery.heading}</SectionHeading>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((src, idx) => (
            <motion.img
              key={idx}
              src={src}
              alt={`Gallery ${idx + 1}`}
              className="rounded-lg shadow-sm object-cover w-full h-44 md:h-64 cursor-zoom-in"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={() => open(idx)}
            />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {lightbox.open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <button onClick={close} className="absolute top-5 right-5 text-white/90 hover:text-white"><X className="w-6 h-6"/></button>
            <button onClick={prev} className="absolute left-4 md:left-8 text-white/90 hover:text-white"><ChevronLeft className="w-8 h-8"/></button>
            <motion.img key={lightbox.index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} src={images[lightbox.index]} alt="Preview" className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl object-contain" />
            <button onClick={next} className="absolute right-4 md:right-8 text-white/90 hover:text-white"><ChevronRight className="w-8 h-8"/></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function Specials({ t }) {
  const picks = [
    {
      title: 'Truffle Tagliolini',
      desc: 'Fresh egg pasta, black truffle, Parmigiano crema',
      badge: 'Seasonal',
      img: 'https://images.unsplash.com/photo-1526312426976-593c64a3a92d?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Bistecca Fiorentina',
      desc: 'Chargrilled T-bone, rosemary, smoked salt',
      badge: 'Chef’s Pick',
      img: 'https://images.unsplash.com/photo-1600891964207-066095021b19?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Seafood Risotto',
      desc: 'Creamy carnaroli rice, prawns, calamari, saffron',
      badge: 'Signature',
      img: 'https://images.unsplash.com/photo-1604908554049-1e8b98cbfbac?q=80&w=1200&auto=format&fit=crop',
    },
  ]
  const [index, setIndex] = useState(0)
  const containerRef = useRef(null)
  const prev = () => setIndex((i) => (i - 1 + picks.length) % picks.length)
  const next = () => setIndex((i) => (i + 1) % picks.length)

  return (
    <section id="specials" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <SectionHeading>{t.specials.heading}</SectionHeading>
        <div className="relative overflow-hidden rounded-xl border border-olive-100" ref={containerRef}>
          <motion.div className="flex" animate={{ x: `-${index * 100}%` }} transition={{ type: 'spring', stiffness: 200, damping: 28 }} style={{ width: `${picks.length * 100}%` }}>
            {picks.map((p, i) => (
              <div key={i} className="w-full md:w-full shrink-0">
                <div className="grid md:grid-cols-2">
                  <img src={p.img} alt={p.title} className="w-full h-64 md:h-96 object-cover" />
                  <div className="p-6 md:p-8 bg-white">
                    <span className="inline-flex text-xs px-2 py-1 rounded-full bg-olive-50 text-olive-800 border border-olive-200 mb-2">{p.badge}</span>
                    <h4 className="text-2xl md:text-3xl font-serif text-olive-900">{p.title}</h4>
                    <p className="text-olive-700 mt-2 text-lg">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3">
            <button onClick={prev} aria-label="Previous" className="p-2 rounded-full bg-white/80 hover:bg-white shadow"><ChevronLeft className="w-5 h-5"/></button>
            <button onClick={next} aria-label="Next" className="p-2 rounded-full bg-white/80 hover:bg-white shadow"><ChevronRight className="w-5 h-5"/></button>
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {picks.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} className={`h-1.5 rounded-full transition-all ${index===i?'w-6 bg-gold-600':'w-2 bg-white/70'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Reservations({ t }) {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2' })
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  function handleSubmit(e) {
    e.preventDefault()
    const msg = `Reservation Request:%0AName: ${form.name}%0APhone: ${form.phone}%0ADate: ${form.date}%0ATime: ${form.time}%0AGuests: ${form.guests}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=${msg}`, '_blank')
  }
  const fields = [
    { key: 'name', label: t.reservations.name, type: 'text' },
    { key: 'phone', label: t.reservations.phone, type: 'text' },
    { key: 'date', label: t.reservations.date, type: 'date' },
    { key: 'time', label: t.reservations.time, type: 'time' },
  ]
  return (
    <section id="reservations" className="bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <SectionHeading>{t.reservations.heading}</SectionHeading>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur p-6 rounded-xl border border-olive-100 shadow-sm" initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((f) => (
                <motion.div key={f.key} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                  <label className="block text-sm text-olive-700 mb-1">{f.label}</label>
                  <input type={f.type} required name={f.key} value={form[f.key]} onChange={handleChange} className="w-full rounded-md border border-olive-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-600" />
                </motion.div>
              ))}
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                <label className="block text-sm text-olive-700 mb-1">{t.reservations.guests}</label>
                <select name="guests" value={form.guests} onChange={handleChange} className="w-full rounded-md border border-olive-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-600">
                  {Array.from({ length: 10 }, (_, i) => `${i + 1}`).map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </motion.div>
            </div>
            <motion.button type="submit" className="mt-5 inline-flex items-center rounded-full bg-gold-600 text-white px-5 py-2.5 hover:bg-gold-700 shadow-[0_0_0_0_rgba(199,156,72,0.7)] hover:shadow-[0_0_25px_8px_rgba(199,156,72,0.35)] transition" variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
              {t.reservations.submit}
            </motion.button>
            <motion.p className="text-sm text-olive-700 mt-3" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>{t.reservations.note}</motion.p>
            <motion.div className="flex items-center gap-3 mt-4" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
              <span className="text-olive-800">{t.reservations.quick}</span>
              <a href={`tel:${WHATSAPP_NUMBER}`} className="inline-flex items-center gap-2 text-olive-900 hover:underline"><Phone className="w-4 h-4" /> {WHATSAPP_NUMBER}</a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`} target="_blank" className="inline-flex items-center gap-2 text-olive-900 hover:underline"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
            </motion.div>
          </motion.form>
          <div className="space-y-4">
            <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop" alt="Chef at work" className="rounded-xl shadow" />
            <img src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1200&auto=format&fit=crop" alt="Ambiance" className="rounded-xl shadow" />
          </div>
        </div>
      </div>
    </section>
  )
}

function GoogleReviews({ t }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 3000)
    return () => clearInterval(id)
  }, [])
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <SectionHeading>{t?.testimonials?.heading || 'Google Reviews'}</SectionHeading>
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="rounded-xl border border-olive-100 p-6 bg-cream-50 text-center">
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: testimonials[idx].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold-600 fill-gold-600" />
                ))}
              </div>
              <p className="mt-4 text-olive-900 text-lg">“{testimonials[idx].text}”</p>
              <p className="mt-2 text-sm text-olive-700">— {testimonials[idx].name}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 text-center">
          <a href="https://www.google.com/maps/search/?api=1&query=Le%20Farfalla%20Restaurant%20Algeria" target="_blank" className="text-olive-900 underline">Open Google Reviews</a>
        </div>
      </div>
    </section>
  )
}

function Contact({ t }) {
  return (
    <section id="contact" className="bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <SectionHeading>{t.contact.heading}</SectionHeading>
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div className="lg:col-span-2 rounded-xl overflow-hidden border border-olive-100" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12949.25314040778!2d3.058756!3d36.752887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e52b1d1b8b8a1%3A0x7b3d0c0d!2sAlgiers!5e0!3m2!1sen!2sdz!4v1700000000000"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-serif text-olive-900 mb-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> {t.contact.addressTitle}</h4>
              <p className="text-olive-800">123 Boulevard Example, Algiers, Algeria</p>
            </div>
            <div>
              <h4 className="text-lg font-serif text-olive-900 mb-2 flex items-center gap-2"><Clock className="w-4 h-4" /> {t.contact.hoursTitle}</h4>
              <ul className="text-olive-800 space-y-1">
                {t.contact.hours.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-serif text-olive-900 mb-2 flex items-center gap-2"><Mail className="w-4 h-4" /> {t.contact.contactTitle}</h4>
              <ul className="text-olive-800 space-y-1">
                <li><a href={`tel:${WHATSAPP_NUMBER}`} className="hover:underline"><Phone className="inline w-4 h-4 mr-2"/> {WHATSAPP_NUMBER}</a></li>
                <li><a href="mailto:hello@lefarfalla.dz" className="hover:underline">hello@lefarfalla.dz</a></li>
                <li className="flex items-center gap-3 mt-2">
                  <a href="#" className="inline-flex items-center gap-1 hover:underline"><Instagram className="w-4 h-4"/> Instagram</a>
                  <a href="#" className="inline-flex items-center gap-1 hover:underline"><Facebook className="w-4 h-4"/> Facebook</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SiteFooter({ t }) {
  return (
    <footer className="bg-olive-950 text-cream-50 border-t border-olive-900/40">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div>
          <p className="text-xl font-serif">Le Farfalla</p>
          <p className="text-cream-200/80 mt-1">© {new Date().getFullYear()} Le Farfalla. {t.footer.rights}</p>
        </div>
        <div className="flex gap-8">
          <div>
            <p className="text-sm font-semibold mb-2">{t.footer.quickLinks}</p>
            <ul className="space-y-1 text-cream-200">
              <li><a href="#menu" className="hover:text-gold-500 transition">Menu</a></li>
              <li><a href="#reservations" className="hover:text-gold-500 transition">{t.nav.reservations}</a></li>
              <li><a href="#contact" className="hover:text-gold-500 transition">{t.nav.contact}</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold mb-2">Social</p>
            <ul className="space-y-1 text-cream-200">
              <li><a href="#" className="inline-flex items-center gap-2 hover:text-gold-500 transition"><Instagram className="w-4 h-4"/> Instagram</a></li>
              <li><a href="#" className="inline-flex items-center gap-2 hover:text-gold-500 transition"><Facebook className="w-4 h-4"/> Facebook</a></li>
            </ul>
          </div>
        </div>
        <div>
          <a href="#home" className="inline-flex items-center rounded-full border border-cream-200/30 px-4 py-2 hover:bg-cream-50 hover:text-olive-900 transition">{t.footer.backToTop}</a>
        </div>
      </div>
    </footer>
  )
}

function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`}
      target="_blank"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-green-600 text-white px-4 py-3 shadow-lg hover:bg-green-700"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-5 h-5" /> WhatsApp
    </a>
  )
}

export default function App() {
  const { t, lang, setLang } = useLang()
  return (
    <div className="font-sans text-olive-900">
      <Nav t={t} onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')} lang={lang} />
      <main className="pt-16">
        <Hero t={t} />
        <About t={t} />
        <MenuSection t={t} />
        <Gallery t={t} />
        <Specials t={t} />
        <Reservations t={t} />
        <GoogleReviews t={t} />
        <Contact t={t} />
      </main>
      <SiteFooter t={t} />
      <FloatingWhatsApp />
    </div>
  )
}
