import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#F4F1E9]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary tracking-tight">Pilates Studio</div>
          <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <li><a href="#clases" className="hover:text-secondary transition-colors">Clases</a></li>
            <li><a href="#horarios" className="hover:text-secondary transition-colors">Horarios</a></li>
            <li><a href="#wellhub" className="hover:text-secondary transition-colors">Wellhub</a></li>
          </ul>
          <a href="#horarios" className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-secondary transition-all hover:-translate-y-0.5 shadow-sm inline-block">
            Reserva ahora
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 flex-1 flex items-center bg-gradient-to-br from-[#FDFBF7] to-[#F4F1E9]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 rounded-l-[100px] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold text-primary leading-[1.1] tracking-tight mb-6">
              Encuentra tu centro,<br />transforma tu cuerpo.
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              Un espacio premium dedicado a tu bienestar. Clases personalizadas de Pilates para fortalecer, flexibilizar y equilibrar tu vida.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#horarios" className="bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-secondary transition-all hover:-translate-y-1 shadow-lg hover:shadow-secondary/30 inline-block text-center">
                Ver Horarios
              </a>
              <a href="#clases" className="bg-transparent text-primary border border-primary px-8 py-4 rounded-full font-medium hover:bg-primary hover:text-white transition-all inline-block text-center">
                Conoce más
              </a>
            </div>
          </div>
          {/* Decorative image placeholder */}
          <div className="hidden lg:block relative h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl fade-in" style={{ animationDelay: '0.2s' }}>
            <img 
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80" 
              alt="Pilates Studio" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section id="clases" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 fade-in">
            <h2 className="text-4xl font-bold text-primary mb-6">Nuestras Clases</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600">Diseñadas para todos los niveles. Encuentra la disciplina perfecta para tus objetivos físicos y mentales.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group rounded-3xl overflow-hidden bg-[#FDFBF7] shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="h-64 relative overflow-hidden">
                <img src="/reformer.png" alt="Reformer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-3">Pilates Reformer</h3>
                <p className="text-gray-600 mb-6">Trabaja fuerza, flexibilidad y postura en nuestras camas especializadas. Grupos reducidos para atención personalizada.</p>
                <a href="#horarios" className="font-medium text-primary hover:text-secondary inline-flex items-center transition-colors">
                  Ver horarios &rarr;
                </a>
              </div>
            </div>
            {/* Card 2 */}
            <div className="group rounded-3xl overflow-hidden bg-[#FDFBF7] shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="h-64 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80" alt="Mat" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-3">Pilates Mat</h3>
                <p className="text-gray-600 mb-6">La base del método clásico. Ejercicios sobre la colchoneta usando el peso corporal para fortalecer tu core al máximo.</p>
                <a href="#horarios" className="font-medium text-primary hover:text-secondary inline-flex items-center transition-colors">
                  Ver horarios &rarr;
                </a>
              </div>
            </div>
            {/* Card 3 */}
            <div className="group rounded-3xl overflow-hidden bg-[#FDFBF7] shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="h-64 relative overflow-hidden">
                <img src="/barre.png" alt="Barre" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-3">Pilates & Barre</h3>
                <p className="text-gray-600 mb-6">Una fusión dinámica de Pilates, danza y entrenamiento funcional. Tonifica y mejora tu resistencia cardiovascular de forma divertida.</p>
                <a href="#horarios" className="font-medium text-primary hover:text-secondary inline-flex items-center transition-colors">
                  Ver horarios &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="horarios" className="py-24 px-6 bg-[#FDFBF7]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 fade-in">
            <h2 className="text-4xl font-bold text-primary mb-6">Horarios de Clases</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-6"></div>
          </div>
          
          <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-[#F4F1E9] fade-in">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="py-5 px-8 font-medium">Hora</th>
                    <th className="py-5 px-8 font-medium">Clase</th>
                    <th className="py-5 px-8 font-medium">Instructor</th>
                    <th className="py-5 px-8 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4F1E9]">
                  {[
                    { time: '07:00 AM', name: 'Pilates Reformer', instructor: 'Ana S.' },
                    { time: '08:30 AM', name: 'Pilates Mat', instructor: 'Laura M.' },
                    { time: '18:00 PM', name: 'Pilates & Barre', instructor: 'Carlos T.' },
                    { time: '19:30 PM', name: 'Pilates Reformer', instructor: 'Ana S.' },
                  ].map((session, i) => (
                    <tr key={i} className="hover:bg-[#FDFBF7] transition-colors">
                      <td className="py-5 px-8 font-medium text-primary">{session.time}</td>
                      <td className="py-5 px-8 text-gray-600">{session.name}</td>
                      <td className="py-5 px-8 text-gray-500">{session.instructor}</td>
                      <td className="py-5 px-8 text-right">
                        <a href={`mailto:hola@pilatesstudio.com?subject=Reserva para clase de ${session.name} a las ${session.time}`} className="text-sm font-medium text-primary border border-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors inline-block">
                          Reservar
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Wellhub Section */}
      <section id="wellhub" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#2D312E] to-[#404541] rounded-[3rem] p-10 md:p-16 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 fade-in">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">¡Somos socios Wellhub!</h2>
              <div className="h-1 w-20 bg-secondary rounded-full mb-8"></div>
              <p className="text-lg text-gray-300 mb-6">
                Si eres usuario de <strong>Wellhub (Gympass)</strong>, puedes asistir a nuestras clases sin costo adicional o con un copago mínimo dependiendo de tu plan corporativo.
              </p>
              <p className="text-gray-300 mb-8">
                Busca "Pilates Studio" en tu aplicación de Wellhub, selecciona la clase que prefieras y realiza tu check-in al llegar a recepción. ¡Así de fácil!
              </p>
              <a href="https://wellhub.com" target="_blank" rel="noopener noreferrer" className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-secondary hover:text-white transition-all shadow-lg inline-block text-center">
                Buscar en Wellhub App
              </a>
            </div>
            <div className="flex-shrink-0">
              <div className="w-48 h-48 md:w-64 md:h-64 bg-secondary rounded-full flex items-center justify-center p-8 shadow-inner rotate-3 hover:rotate-0 transition-transform duration-500">
                <span className="text-white text-2xl md:text-3xl font-bold text-center leading-tight">Wellhub<br/>Partner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              <li><a href="#wellhub" className="hover:text-secondary transition-colors">Convenio Wellhub</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contacto</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-secondary">📍</span> Av. Bienestar 123, Ciudad, CP 10000
              </li>
              <li className="flex items-center gap-3">
                <span className="text-secondary">📞</span> +52 (55) 1234-5678
              </li>
              <li className="flex items-center gap-3">
                <span className="text-secondary">✉️</span> hola@pilatesstudio.com
              </li>
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
