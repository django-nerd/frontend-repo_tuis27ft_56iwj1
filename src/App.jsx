import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Instagram, Facebook, Star, Menu as MenuIcon, MapPin, Clock, Mail, ChevronDown, Download, MessageCircle } from 'lucide-react'

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
    specials: { heading: "Specials & Chef’s Picks" },
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
    { name: 'Bruschetta al Pomodoro', desc: 'Toasted bread, tomatoes, basil, olive oil', price: '900 DZD' },
    { name: 'Burrata e Prosciutto', desc: 'Creamy burrata, cured ham, arugula', price: '2,200 DZD' },
  ],
  pastas: [
    { name: 'Tagliatelle al Ragù', desc: 'Slow-cooked beef ragù, Parmigiano', price: '2,100 DZD' },
    { name: 'Spaghetti alle Vongole', desc: 'Clams, garlic, white wine, parsley', price: '2,500 DZD' },
  ],
  pizzas: [
    { name: 'Margherita D.O.P.', desc: 'San Marzano tomatoes, mozzarella, basil', price: '1,600 DZD' },
    { name: 'Diavola', desc: 'Spicy salami, fior di latte, chili oil', price: '1,900 DZD' },
  ],
  mains: [
    { name: 'Branzino al Forno', desc: 'Baked sea bass, lemon, herbs', price: '3,800 DZD' },
    { name: 'Pollo alla Milanese', desc: 'Crispy breaded chicken, salad', price: '2,900 DZD' },
  ],
  desserts: [
    { name: 'Tiramisu', desc: 'Espresso-soaked ladyfingers, mascarpone', price: '1,200 DZD' },
    { name: 'Panna Cotta', desc: 'Vanilla cream, berry coulis', price: '1,100 DZD' },
  ],
  drinks: [
    { name: 'Espresso', desc: 'Single shot Italian espresso', price: '400 DZD' },
    { name: 'Limonata', desc: 'Fresh lemon soda', price: '600 DZD' },
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
  }, [lang])
  return { lang, setLang, t }
}

function SectionHeading({ children }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-serif tracking-tight text-olive-900 mb-6"
    >
      {children}
    </motion.h2>
  )
}

function Nav({ t, onToggleLang, lang }) {
  const [open, setOpen] = useState(false)
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
    <div className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-olive-100">
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
            <a href="#reservations" className="ml-2 inline-flex items-center rounded-full bg-gold-600 text-white px-4 py-2 hover:bg-gold-700 transition">
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
    </div>
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
    <section id="home" className="relative h-[90vh] min-h-[560px] flex items-center">
      <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center bg-fixed" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-gold-600" />
            <span className="text-sm text-olive-900">Le Farfalla</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-white tracking-tight drop-shadow-md">
            {t.hero.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-xl">
            {t.hero.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#reservations" className="inline-flex items-center rounded-full bg-gold-600 text-white px-6 py-3 hover:bg-gold-700 transition">
              {t.hero.cta}
            </a>
            <a href="#menu" className="inline-flex items-center rounded-full bg-white/90 text-olive-900 px-6 py-3 hover:bg-white transition">
              {translations.en.ctas.viewMenu}
            </a>
          </div>
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
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionHeading>{t.about.heading}</SectionHeading>
            <p className="text-olive-900/90 leading-relaxed mb-4">{t.about.text1}</p>
            <p className="text-olive-900/90 leading-relaxed">{t.about.text2}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
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
            <div key={key} className="">
              <h3 className="text-xl font-serif text-olive-900 mb-4">
                {t.menu.sections[key]}
              </h3>
              <ul className="space-y-4">
                {items.map((it, idx) => (
                  <li key={idx} className="flex items-start justify-between border-b border-olive-100 pb-3">
                    <div>
                      <p className="font-medium text-olive-900">{it.name}</p>
                      <p className="text-sm text-olive-700">{it.desc}</p>
                    </div>
                    <span className="text-olive-900 font-semibold">{it.price}</span>
                  </li>
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
              className="rounded-lg shadow-sm object-cover w-full h-44 md:h-64"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            />
          ))}
        </div>
      </div>
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
  ]
  return (
    <section id="specials" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <SectionHeading>{t.specials.heading}</SectionHeading>
        <div className="grid md:grid-cols-2 gap-6">
          {picks.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-xl overflow-hidden border border-olive-100 bg-white">
              <img src={p.img} alt={p.title} className="w-full h-56 object-cover" />
              <div className="p-5">
                <span className="inline-flex text-xs px-2 py-1 rounded-full bg-olive-50 text-olive-800 border border-olive-200 mb-2">{p.badge}</span>
                <h4 className="text-xl font-serif text-olive-900">{p.title}</h4>
                <p className="text-olive-700 mt-1">{p.desc}</p>
              </div>
            </motion.div>
          ))}
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
  return (
    <section id="reservations" className="bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <SectionHeading>{t.reservations.heading}</SectionHeading>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur p-6 rounded-xl border border-olive-100 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-olive-700 mb-1">{t.reservations.name}</label>
                <input required name="name" value={form.name} onChange={handleChange} className="w-full rounded-md border border-olive-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-600" />
              </div>
              <div>
                <label className="block text-sm text-olive-700 mb-1">{t.reservations.phone}</label>
                <input required name="phone" value={form.phone} onChange={handleChange} className="w-full rounded-md border border-olive-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-600" />
              </div>
              <div>
                <label className="block text-sm text-olive-700 mb-1">{t.reservations.date}</label>
                <input type="date" required name="date" value={form.date} onChange={handleChange} className="w-full rounded-md border border-olive-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-600" />
              </div>
              <div>
                <label className="block text-sm text-olive-700 mb-1">{t.reservations.time}</label>
                <input type="time" required name="time" value={form.time} onChange={handleChange} className="w-full rounded-md border border-olive-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-600" />
              </div>
              <div>
                <label className="block text-sm text-olive-700 mb-1">{t.reservations.guests}</label>
                <select name="guests" value={form.guests} onChange={handleChange} className="w-full rounded-md border border-olive-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-600">
                  {Array.from({ length: 10 }, (_, i) => `${i + 1}`).map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="mt-5 inline-flex items-center rounded-full bg-gold-600 text-white px-5 py-2.5 hover:bg-gold-700">
              {t.reservations.submit}
            </button>
            <p className="text-sm text-olive-700 mt-3">{t.reservations.note}</p>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-olive-800">{t.reservations.quick}</span>
              <a href={`tel:${WHATSAPP_NUMBER}`} className="inline-flex items-center gap-2 text-olive-900 hover:underline"><Phone className="w-4 h-4" /> {WHATSAPP_NUMBER}</a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`} target="_blank" className="inline-flex items-center gap-2 text-olive-900 hover:underline"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
            </div>
          </form>
          <div className="space-y-4">
            <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop" alt="Chef at work" className="rounded-xl shadow" />
            <img src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1200&auto=format&fit=crop" alt="Ambiance" className="rounded-xl shadow" />
          </div>
        </div>
      </div>
    </section>
  )
}

function GoogleReviews() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <SectionHeading>Google Reviews</SectionHeading>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((r, i) => (
            <div key={i} className="rounded-xl border border-olive-100 p-5 bg-cream-50">
              <div className="flex items-center gap-2">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-gold-600 fill-gold-600" />
                ))}
              </div>
              <p className="mt-3 text-olive-900">“{r.text}”</p>
              <p className="mt-2 text-sm text-olive-700">— {r.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
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
          <div className="lg:col-span-2 rounded-xl overflow-hidden border border-olive-100">
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
          </div>
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
    <footer className="bg-white border-t border-olive-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div>
          <p className="text-xl font-serif text-olive-900">Le Farfalla</p>
          <p className="text-olive-700 mt-1">© {new Date().getFullYear()} Le Farfalla. {t.footer.rights}</p>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="text-sm font-semibold text-olive-900 mb-2">{t.footer.quickLinks}</p>
            <ul className="space-y-1 text-olive-800">
              <li><a href="#menu" className="hover:underline">Menu</a></li>
              <li><a href="#reservations" className="hover:underline">{t.nav.reservations}</a></li>
              <li><a href="#contact" className="hover:underline">{t.nav.contact}</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-olive-900 mb-2">Social</p>
            <ul className="space-y-1 text-olive-800">
              <li><a href="#" className="hover:underline">Instagram</a></li>
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">TikTok</a></li>
            </ul>
          </div>
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
        <GoogleReviews />
        <Contact t={t} />
      </main>
      <SiteFooter t={t} />
      <FloatingWhatsApp />
    </div>
  )
}
