"use client";

import { useState, useEffect, useRef } from "react";

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "¿Necesito experiencia previa para tomar clases?",
    a: "No, para nada. Contamos con clases para todos los niveles, desde principiantes absolutos hasta practicantes avanzados. Al inscribirte, nuestros instructores hacen una evaluación inicial para ubicarte en el grupo ideal.",
  },
  {
    q: "¿Qué ropa debo usar?",
    a: "Ropa cómoda y ajustada que permita libertad de movimiento: mallas o leggings, top o playera entallada. Para Reformer se recomienda usar calcetines antideslizantes (nosotros los vendemos en recepción).",
  },
  {
    q: "¿Con cuánta anticipación debo reservar?",
    a: "Recomendamos reservar con al menos 24 horas de anticipación, especialmente para clases de Reformer que tienen cupo limitado (máx. 6 personas). Las reservas de último momento están sujetas a disponibilidad.",
  },
  {
    q: "¿Puedo cancelar o cambiar mi reserva?",
    a: "Sí, puedes cancelar o reprogramar hasta 4 horas antes de la clase sin ningún costo. Cancelaciones tardías o no-shows descuentan la clase de tu plan.",
  },
  {
    q: "¿Aceptan Wellhub / Gympass?",
    a: "¡Sí! Somos estudio afiliado a Wellhub. Dependiendo de tu plan corporativo, puedes asistir sin costo adicional o con un copago mínimo. Solo busca \"Pilates Studio\" en la app y reserva directamente desde ahí.",
  },
  {
    q: "¿Los planes tienen contrato de permanencia?",
    a: "No. Todos nuestros planes son mensuales sin contrato forzoso. Puedes pausar o cancelar en cualquier momento antes de tu siguiente fecha de renovación.",
  },
];

// ─── Data ────────────────────────────────────────────────────────────────────

const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const scheduleByDay: Record<string, { time: string; name: string; instructor: string; spots: number }[]> = {
  Lun: [
    { time: "07:00 AM", name: "Pilates Reformer", instructor: "Ana S.", spots: 3 },
    { time: "09:00 AM", name: "Pilates Mat", instructor: "Laura M.", spots: 8 },
    { time: "18:00 PM", name: "Pilates & Barre", instructor: "Carlos T.", spots: 5 },
    { time: "19:30 PM", name: "Pilates Reformer", instructor: "Ana S.", spots: 2 },
  ],
  Mar: [
    { time: "08:00 AM", name: "Pilates Mat", instructor: "Laura M.", spots: 10 },
    { time: "10:00 AM", name: "Pilates Reformer", instructor: "Carlos T.", spots: 4 },
    { time: "19:00 PM", name: "Pilates & Barre", instructor: "Ana S.", spots: 6 },
  ],
  Mié: [
    { time: "07:00 AM", name: "Pilates Reformer", instructor: "Ana S.", spots: 1 },
    { time: "09:00 AM", name: "Pilates & Barre", instructor: "Carlos T.", spots: 7 },
    { time: "18:00 PM", name: "Pilates Mat", instructor: "Laura M.", spots: 9 },
    { time: "20:00 PM", name: "Pilates Reformer", instructor: "Ana S.", spots: 3 },
  ],
  Jue: [
    { time: "08:00 AM", name: "Pilates Mat", instructor: "Laura M.", spots: 8 },
    { time: "18:30 PM", name: "Pilates Reformer", instructor: "Carlos T.", spots: 4 },
    { time: "20:00 PM", name: "Pilates & Barre", instructor: "Ana S.", spots: 5 },
  ],
  Vie: [
    { time: "07:00 AM", name: "Pilates Reformer", instructor: "Ana S.", spots: 2 },
    { time: "09:00 AM", name: "Pilates Mat", instructor: "Laura M.", spots: 6 },
    { time: "18:00 PM", name: "Pilates & Barre", instructor: "Carlos T.", spots: 8 },
  ],
  Sáb: [
    { time: "09:00 AM", name: "Pilates Reformer", instructor: "Ana S.", spots: 5 },
    { time: "10:30 AM", name: "Pilates Mat", instructor: "Laura M.", spots: 10 },
    { time: "12:00 PM", name: "Pilates & Barre", instructor: "Carlos T.", spots: 4 },
  ],
  Dom: [
    { time: "10:00 AM", name: "Pilates Mat", instructor: "Laura M.", spots: 12 },
    { time: "11:30 AM", name: "Pilates Reformer", instructor: "Ana S.", spots: 6 },
  ],
};

const plans = [
  {
    name: "Esencial",
    price: "$890",
    period: "/ mes",
    description: "Perfecto para comenzar tu práctica.",
    features: ["4 clases al mes", "Acceso Mat y Barre", "App para reservas", "1 evaluación inicial"],
    highlight: false,
    cta: "Comenzar ahora",
  },
  {
    name: "Studio",
    price: "$1,490",
    period: "/ mes",
    description: "El plan favorito de nuestras alumnas.",
    features: ["12 clases al mes", "Acceso a todas las disciplinas", "Reservas prioritarias", "Seguimiento mensual", "Descuento en talleres"],
    highlight: true,
    cta: "Elegir Studio",
  },
  {
    name: "Ilimitado",
    price: "$2,100",
    period: "/ mes",
    description: "Para quienes viven el Pilates.",
    features: ["Clases ilimitadas", "Acceso a todas las disciplinas", "Reservas VIP", "Coach personal mensual", "Descuento 20% en talleres", "Acceso a retiros"],
    highlight: false,
    cta: "Ir al máximo",
  },
];

const testimonials = [
  {
    name: "Sofía R.",
    role: "Alumna desde 2023",
    quote: "Llevo más de un año viniendo y jamás me he sentido tan bien en mi cuerpo. Ana es increíble explicando cada movimiento y siempre te corrige con mucho respeto.",
    stars: 5,
    initials: "SR",
    color: "bg-secondary",
  },
  {
    name: "Mariana L.",
    role: "Plan Studio",
    quote: "Probé varios estudios antes y este es diferente. El espacio es precioso, los instructores conocen perfectamente el método y el ambiente es muy positivo. 100% recomendado.",
    stars: 5,
    initials: "ML",
    color: "bg-[#9B8EA0]",
  },
  {
    name: "Camila V.",
    role: "Plan Ilimitado",
    quote: "Después de mi embarazo necesitaba algo suave pero efectivo. Las clases de Mat me ayudaron a recuperarme mucho más rápido de lo esperado. Ahora ya hago Reformer y me encanta.",
    stars: 5,
    initials: "CV",
    color: "bg-[#A8957A]",
  },
];

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Small reusable Reveal wrapper ───────────────────────────────────────────

function Reveal({ children, className = "", delay = "" }: { children: React.ReactNode; className?: string; delay?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${delay} ${className}`}>
      {children}
    </div>
  );
}

// ─── Stars component ──────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-secondary fill-secondary" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#F4F1E9] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-6 flex items-center justify-between gap-4 group"
      >
        <span className="font-semibold text-primary group-hover:text-secondary transition-colors">{q}</span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full border border-[#F4F1E9] flex items-center justify-center transition-all duration-300 ${
            open ? "bg-primary border-primary rotate-180" : "bg-white"
          }`}
        >
          <svg
            className={`w-4 h-4 transition-colors ${open ? "text-white" : "text-primary"}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-600 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeDay, setActiveDay] = useState("Lun");
  const [menuOpen, setMenuOpen] = useState(false);
  const sessions = scheduleByDay[activeDay] ?? [];

  // Auto-select today
  useEffect(() => {
    const dayMap = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const today = dayMap[new Date().getDay()];
    if (scheduleByDay[today]) setActiveDay(today);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Navbar ── */}
      <nav className="fixed w-full z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#F4F1E9]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary tracking-tight">Pilates Studio</div>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <li><a href="#clases" className="hover:text-secondary transition-colors">Clases</a></li>
            <li><a href="#horarios" className="hover:text-secondary transition-colors">Horarios</a></li>
            <li><a href="#precios" className="hover:text-secondary transition-colors">Precios</a></li>
            <li><a href="#wellhub" className="hover:text-secondary transition-colors">Wellhub</a></li>
          </ul>

          <div className="flex items-center gap-3">
            <a href="#precios" className="hidden md:inline-block bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-secondary transition-all hover:-translate-y-0.5 shadow-sm">
              Reserva ahora
            </a>
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-xl hover:bg-[#F4F1E9] transition-colors"
              aria-label="Abrir menú"
            >
              <span className={`block h-0.5 w-5 bg-primary rounded transition-all duration-300 origin-center ${ menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-5 bg-primary rounded transition-all duration-300 ${ menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-primary rounded transition-all duration-300 origin-center ${ menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#FDFBF7] border-t border-[#F4F1E9] ${ menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
          <ul className="flex flex-col px-6 py-4 gap-1">
            {[
              { href: "#clases", label: "Clases" },
              { href: "#horarios", label: "Horarios" },
              { href: "#precios", label: "Precios" },
              { href: "#wellhub", label: "Wellhub" },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-sm font-medium text-gray-700 hover:text-secondary transition-colors border-b border-[#F4F1E9] last:border-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="#precios"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center bg-primary text-white py-3 rounded-full text-sm font-medium hover:bg-secondary transition-all"
              >
                Reserva ahora
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background image visible on ALL screens */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80"
            alt="Pilates Studio"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay on mobile, lighter on desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/95 via-[#FDFBF7]/80 to-[#FDFBF7]/20 lg:from-[#FDFBF7]/90 lg:via-[#FDFBF7]/60 lg:to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-48 lg:pb-32">
          <div className="max-w-xl fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary leading-[1.1] tracking-tight mb-6">
              Encuentra tu centro,<br />transforma tu cuerpo.
            </h1>
            <p className="text-base sm:text-lg text-gray-700 mb-10 max-w-lg leading-relaxed">
              Un espacio premium dedicado a tu bienestar. Clases personalizadas de Pilates para fortalecer, flexibilizar y equilibrar tu vida.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#horarios" className="bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-secondary transition-all hover:-translate-y-1 shadow-lg hover:shadow-secondary/30 inline-block text-center">
                Ver Horarios
              </a>
              <a href="#clases" className="bg-white/80 backdrop-blur-sm text-primary border border-primary/30 px-8 py-4 rounded-full font-medium hover:bg-primary hover:text-white transition-all inline-block text-center">
                Conoce más
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Classes ── */}
      <section id="clases" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Nuestras Clases</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-6" />
            <p className="text-gray-600">Diseñadas para todos los niveles. Encuentra la disciplina perfecta para tus objetivos físicos y mentales.</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: "/reformer.png", title: "Pilates Reformer", desc: "Trabaja fuerza, flexibilidad y postura en nuestras camas especializadas. Grupos reducidos para atención personalizada.", delay: "delay-100" },
              { img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80", title: "Pilates Mat", desc: "La base del método clásico. Ejercicios sobre la colchoneta usando el peso corporal para fortalecer tu core al máximo.", delay: "delay-200" },
              { img: "/barre.png", title: "Pilates & Barre", desc: "Una fusión dinámica de Pilates, danza y entrenamiento funcional. Tonifica y mejora tu resistencia cardiovascular de forma divertida.", delay: "delay-300" },
            ].map((card) => (
              <Reveal key={card.title} delay={card.delay}>
                <div className="group rounded-3xl overflow-hidden bg-[#FDFBF7] shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 h-full">
                  <div className="h-64 relative overflow-hidden">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-primary mb-3">{card.title}</h3>
                    <p className="text-gray-600 mb-6">{card.desc}</p>
                    <a href="#horarios" className="font-medium text-primary hover:text-secondary inline-flex items-center transition-colors">
                      Ver horarios &rarr;
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Schedule ── */}
      <section id="horarios" className="py-24 px-6 bg-[#FDFBF7]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl font-bold text-primary mb-6">Horarios de Clases</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-6" />
            <p className="text-gray-600">Selecciona el día que más te convenga y reserva tu lugar.</p>
          </Reveal>

          {/* Day selector */}
          <Reveal className="mb-6" delay="delay-100">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-start md:justify-center">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeDay === day
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-white text-gray-600 border border-[#F4F1E9] hover:border-primary hover:text-primary"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay="delay-200">
            <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-[#F4F1E9]">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="py-5 px-8 font-medium">Hora</th>
                      <th className="py-5 px-8 font-medium">Clase</th>
                      <th className="py-5 px-8 font-medium">Instructor</th>
                      <th className="py-5 px-8 font-medium">Lugares</th>
                      <th className="py-5 px-8 font-medium" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4F1E9]">
                    {sessions.map((s, i) => (
                      <tr key={i} className="hover:bg-[#FDFBF7] transition-colors">
                        <td className="py-5 px-8 font-medium text-primary">{s.time}</td>
                        <td className="py-5 px-8 text-gray-700 font-medium">{s.name}</td>
                        <td className="py-5 px-8 text-gray-500">{s.instructor}</td>
                        <td className="py-5 px-8">
                          <span className={`text-sm font-semibold ${s.spots <= 2 ? "text-red-500" : "text-secondary"}`}>
                            {s.spots <= 2 ? `¡Solo ${s.spots}!` : `${s.spots} disponibles`}
                          </span>
                        </td>
                        <td className="py-5 px-8 text-right">
                          <a
                            href={`mailto:hola@pilatesstudio.com?subject=Reserva: ${s.name} – ${activeDay} ${s.time}`}
                            className="text-sm font-medium text-primary border border-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors inline-block"
                          >
                            Reservar
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="block md:hidden divide-y divide-[#F4F1E9]">
                {sessions.map((s, i) => (
                  <div key={i} className="p-6 hover:bg-[#FDFBF7] transition-colors">
                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="text-3xl font-bold text-primary tracking-tight leading-none">{s.time.split(" ")[0]}</span>
                      <span className="text-xs font-bold text-secondary uppercase">{s.time.split(" ")[1]}</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800 mb-0.5">{s.name}</div>
                    <div className="text-sm text-gray-500 mb-1">Con {s.instructor}</div>
                    <div className={`text-sm font-semibold mb-4 ${s.spots <= 2 ? "text-red-500" : "text-secondary"}`}>
                      {s.spots <= 2 ? `¡Solo ${s.spots} lugares!` : `${s.spots} lugares disponibles`}
                    </div>
                    <a
                      href={`mailto:hola@pilatesstudio.com?subject=Reserva: ${s.name} – ${activeDay} ${s.time}`}
                      className="block w-full text-center font-medium text-primary border border-primary py-3 rounded-full hover:bg-primary hover:text-white transition-all"
                    >
                      Reservar lugar
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="precios" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Planes y Precios</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-6" />
            <p className="text-gray-600">Sin contratos forzosos. Cancela cuando quieras. Elige el plan que mejor se adapte a tu estilo de vida.</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i === 0 ? "delay-100" : i === 1 ? "delay-200" : "delay-300"}>
                <div className={`relative rounded-3xl p-8 border transition-all hover:-translate-y-1 hover:shadow-xl ${
                  plan.highlight
                    ? "bg-primary text-white border-primary shadow-2xl scale-105"
                    : "bg-[#FDFBF7] border-[#F4F1E9] text-primary"
                }`}>
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md tracking-wide uppercase">
                      Más popular
                    </div>
                  )}
                  <div className={`text-sm font-semibold uppercase tracking-widest mb-4 ${plan.highlight ? "text-secondary" : "text-secondary"}`}>
                    {plan.name}
                  </div>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className={`text-sm mb-2 ${plan.highlight ? "text-gray-300" : "text-gray-500"}`}>{plan.period}</span>
                  </div>
                  <p className={`text-sm mb-8 ${plan.highlight ? "text-gray-300" : "text-gray-500"}`}>{plan.description}</p>
                  <ul className="space-y-3 mb-10">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-3 text-sm">
                        <svg className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-secondary" : "text-secondary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={plan.highlight ? "text-gray-200" : "text-gray-600"}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`mailto:hola@pilatesstudio.com?subject=Información sobre el plan ${plan.name}`}
                    className={`block w-full text-center py-3.5 rounded-full font-semibold transition-all ${
                      plan.highlight
                        ? "bg-white text-primary hover:bg-secondary hover:text-white"
                        : "border border-primary text-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-10 text-sm text-gray-400" delay="delay-400">
            ¿Eres usuario Wellhub? Accede con tu plan corporativo sin pago adicional. <a href="#wellhub" className="text-secondary font-medium hover:underline">Más info</a>
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Lo que dicen nuestras alumnas</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-6" />
            <p className="text-gray-600">Historias reales de personas que transformaron su bienestar con nosotros.</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i === 0 ? "delay-100" : i === 1 ? "delay-200" : "delay-300"}>
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#F4F1E9] hover:shadow-lg transition-all hover:-translate-y-1 h-full flex flex-col">
                  <Stars count={t.stars} />
                  <p className="text-gray-700 leading-relaxed flex-1 mb-8 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-primary">{t.name}</div>
                      <div className="text-sm text-gray-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Preguntas frecuentes</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-6" />
            <p className="text-gray-600">Todo lo que necesitas saber antes de tu primera clase.</p>
          </Reveal>

          <Reveal delay="delay-100">
            <div className="bg-[#FDFBF7] rounded-3xl px-8 border border-[#F4F1E9]">
              {faqs.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </Reveal>

          <Reveal className="text-center mt-10" delay="delay-200">
            <p className="text-gray-500 text-sm">¿Tienes otra pregunta? <a href="mailto:hola@pilatesstudio.com" className="text-secondary font-medium hover:underline">Escríbenos directamente</a></p>
          </Reveal>
        </div>
      </section>

      {/* ── Wellhub ── */}
      <section id="wellhub" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="bg-gradient-to-r from-[#2D312E] to-[#404541] rounded-[3rem] p-10 md:p-16 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">¡Somos socios Wellhub!</h2>
                <div className="h-1 w-20 bg-secondary rounded-full mb-8" />
                <p className="text-lg text-gray-300 mb-6">
                  Si eres usuario de <strong>Wellhub (Gympass)</strong>, puedes asistir a nuestras clases sin costo adicional o con un copago mínimo dependiendo de tu plan corporativo.
                </p>
                <p className="text-gray-300 mb-8">
                  Busca &quot;Pilates Studio&quot; en tu aplicación de Wellhub, selecciona la clase que prefieras y realiza tu check-in al llegar a recepción. ¡Así de fácil!
                </p>
                <a href="https://wellhub.com" target="_blank" rel="noopener noreferrer" className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-secondary hover:text-white transition-all shadow-lg inline-block text-center">
                  Buscar en Wellhub App
                </a>
              </div>
              <div className="flex-shrink-0">
                <div className="w-48 h-48 md:w-64 md:h-64 bg-secondary rounded-full flex items-center justify-center p-8 shadow-inner rotate-3 hover:rotate-0 transition-transform duration-500">
                  <span className="text-white text-2xl md:text-3xl font-bold text-center leading-tight">Wellhub<br />Partner</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-primary text-white pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">Pilates Studio</h3>
            <p className="text-gray-400 max-w-sm">
              Encuentra tu equilibrio cada día. Un espacio diseñado para transformar tu cuerpo y calmar tu mente a través del método Pilates.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Enlaces</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#clases" className="hover:text-secondary transition-colors">Nuestras Clases</a></li>
              <li><a href="#horarios" className="hover:text-secondary transition-colors">Horarios y Reservas</a></li>
              <li><a href="#precios" className="hover:text-secondary transition-colors">Planes y Precios</a></li>
              <li><a href="#wellhub" className="hover:text-secondary transition-colors">Convenio Wellhub</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contacto</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3"><span className="text-secondary">📍</span> Av. Bienestar 123, Ciudad, CP 10000</li>
              <li className="flex items-center gap-3"><span className="text-secondary">📞</span> +52 (55) 1234-5678</li>
              <li className="flex items-center gap-3"><span className="text-secondary">✉️</span> hola@pilatesstudio.com</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Pilates Studio. Todos los derechos reservados.
        </div>
      </footer>

    </div>
  );
}
