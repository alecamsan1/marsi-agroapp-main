import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Leaf, Store, Truck, User, Mail, Smartphone, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const baseDatosUsuarios = [
  { email: "cliente@agroapp.com", password: "123", role: "/customer" },
  { email: "agricultor@agroapp.com", password: "123", role: "/farmer" },
  { email: "repartidor@agroapp.com", password: "123", role: "/delivery" }
];

export function RoleSelection() {
  const navigate = useNavigate();
  const [flow, setFlow] = useState<"inicio" | "registro" | "login">("inicio");
  
  const [regPaso, setRegPaso] = useState<1 | 2 | 3 | 4>(1);
  const [logPaso, setLogPaso] = useState<1 | 2 | 3 | 4 | 5>(1);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rolSeleccionado, setRolSeleccionado] = useState<"/customer" | "/farmer" | "/delivery" | "">("");
  const [terminos, setTerminos] = useState(false);
  const [recordarSesion, setRecordarSesion] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const resetEstados = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRolSeleccionado("");
    setTerminos(false);
    setError("");
    setCargando(false);
  };

  const handleLoginMetodo = (metodo: "email" | "externo") => {
    setError("");
    if (metodo === "externo") {
      setCargando(true);
      setTimeout(() => {
        setCargando(false);
        navigate("/customer");
      }, 1000);
    } else {
      setLogPaso(2);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const usuario = baseDatosUsuarios.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!usuario) {
      setError("❌ Correo o contraseña incorrectos");
      return;
    }
    navigate(usuario.role);
  };

  const handleRecuperarCorreo = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const existe = baseDatosUsuarios.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (!existe) {
      setError("❌ Correo no encontrado");
      return;
    }
    setLogPaso(4);
  };

  const handleActualizarContrasena = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("❌ Las contraseñas no coinciden");
      return;
    }
    setLogPaso(5);
  };

  const handleRegMetodo = (metodo: "email" | "externo") => {
    setError("");
    if (metodo === "externo") {
      setCargando(true);
      setTimeout(() => {
        setEmail("usuario.auth@gmail.com");
        setCargando(false);
        setRegPaso(3);
      }, 1000);
    } else {
      setRegPaso(2);
    }
  };

  const handleRegVerificar = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (baseDatosUsuarios.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      setError("❌ El correo ya está registrado");
      return;
    }
    setRegPaso(3);
  };

  const handleRegFinalizar = () => {
    if (!rolSeleccionado) { setError("Selecciona un perfil"); return; }
    if (!terminos) { setError("Acepta los términos"); return; }
    setRegPaso(4);
  };

  return (
    <div className="flex-1 bg-[#426b1f] text-white flex flex-col items-center justify-center p-6 h-full relative overflow-y-auto">
      {flow !== "inicio" && (regPaso < 4 && logPaso !== 5) && (
        <button
          onClick={() => {
            setError("");
            if (flow === "registro") {
              if (regPaso === 1) setFlow("inicio");
              else setRegPaso(p => (p - 1) as any);
            } else {
              if (logPaso === 1) setFlow("inicio");
              else if (logPaso === 2) setLogPaso(1);
              else if (logPaso === 3) setLogPaso(2);
              else if (logPaso === 4) setLogPaso(3);
            }
          }}
          className="absolute top-8 left-6 p-2 bg-white/20 rounded-full hover:bg-white/30 transition sandbox-pointer cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
      )}

      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-3 mb-10 mt-8">
        <Leaf className="w-12 h-12" />
        <h1 className="text-4xl font-bold tracking-tight">Agroapp</h1>
      </motion.div>

      <div className="w-full max-w-sm space-y-4 pb-8">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-red-500/20 border border-red-400 text-white p-3 rounded-xl text-center text-sm font-medium mb-4">
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {flow === "inicio" && (
          <motion.div key="inicio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <p className="text-center text-green-100 mb-8 font-medium text-lg">Bienvenido a Agroapp</p>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { resetEstados(); setFlow("login"); setLogPaso(1); }} className="w-full bg-white text-[#426b1f] p-5 rounded-2xl font-bold text-xl flex items-center justify-center shadow-lg">
              Iniciar Sesión
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { resetEstados(); setFlow("registro"); setRegPaso(1); }} className="w-full bg-green-900 text-white p-5 rounded-2xl font-bold text-xl flex items-center justify-center shadow-lg border border-green-700">
              Registrarse
            </motion.button>
          </motion.div>
        )}

        {flow === "login" && (
          <AnimatePresence mode="wait">
            {logPaso === 1 && (
              <motion.div key="l1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <p className="text-center text-green-100 mb-8 font-medium text-lg">Método de acceso</p>
                <button onClick={() => handleLoginMetodo("email")} className="w-full bg-white text-[#426b1f] p-5 rounded-2xl font-bold text-xl flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full"><Mail className="w-6 h-6 text-[#426b1f]" /></div>
                    Email y contraseña
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
                <button onClick={() => handleLoginMetodo("externo")} className="w-full bg-white text-[#426b1f] p-5 rounded-2xl font-bold text-xl flex items-center justify-between shadow-lg opacity-90">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full"><Smartphone className="w-6 h-6 text-[#426b1f]" /></div>
                    Apple / Google
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              </motion.div>
            )}

            {logPaso === 2 && (
              <motion.form key="l2" onSubmit={handleLoginSubmit} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <p className="text-center text-green-100 mb-8 font-medium text-lg">Introduce tus credenciales</p>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Correo electrónico" className="w-full p-5 rounded-2xl font-medium text-lg text-gray-900 bg-white shadow-inner outline-none focus:ring-4 focus:ring-green-300 placeholder-gray-400" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Contraseña" className="w-full p-5 rounded-2xl font-medium text-lg text-gray-900 bg-white shadow-inner outline-none focus:ring-4 focus:ring-green-300 placeholder-gray-400" />
                
                <div className="flex items-center gap-3 py-2 px-2">
                  <input type="checkbox" id="remember" checked={recordarSesion} onChange={e => setRecordarSesion(e.target.checked)} className="w-6 h-6 rounded border-gray-300 text-green-900 focus:ring-green-900 accent-green-900" />
                  <label htmlFor="remember" className="text-sm font-medium text-green-50">Recordar sesión en este dispositivo</label>
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-green-900 text-white p-5 rounded-2xl font-bold text-xl mt-2 shadow-lg border border-green-700">
                  Entrar
                </motion.button>
                <button type="button" onClick={() => { setError(""); setLogPaso(3); }} className="w-full text-center text-sm font-semibold text-green-200 underline mt-4">
                  ¿Has olvidado tu contraseña?
                </button>
              </motion.form>
            )}

            {logPaso === 3 && (
              <motion.form key="l3" onSubmit={handleRecuperarCorreo} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <p className="text-center text-green-100 mb-8 font-medium text-lg">Recuperar contraseña</p>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Introduce tu correo registrado" className="w-full p-5 rounded-2xl font-medium text-lg text-gray-900 bg-white shadow-inner outline-none focus:ring-4 focus:ring-green-300 placeholder-gray-400" />
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-green-900 text-white p-5 rounded-2xl font-bold text-xl mt-4 shadow-lg border border-green-700">
                  Verificar Correo
                </motion.button>
              </motion.form>
            )}

            {logPaso === 4 && (
              <motion.form key="l4" onSubmit={handleActualizarContrasena} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <p className="text-center text-green-100 mb-8 font-medium text-lg">Nueva contraseña</p>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Nueva contraseña" className="w-full p-5 rounded-2xl font-medium text-lg text-gray-900 bg-white shadow-inner outline-none focus:ring-4 focus:ring-green-300 placeholder-gray-400" />
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required placeholder="Confirmar nueva contraseña" className="w-full p-5 rounded-2xl font-medium text-lg text-gray-900 bg-white shadow-inner outline-none focus:ring-4 focus:ring-green-300 placeholder-gray-400" />
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-green-900 text-white p-5 rounded-2xl font-bold text-xl mt-4 shadow-lg border border-green-700">
                  Actualizar Contraseña
                </motion.button>
              </motion.form>
            )}

            {logPaso === 5 && (
              <motion.div key="l5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center mt-12 space-y-6">
                <div className="w-24 h-24 bg-white text-[#426b1f] rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">¡Actualizada!</h2>
                  <p className="text-green-100 font-medium mt-4 text-lg">Contraseña actualizada correctamente</p>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setFlow("login"); setLogPaso(2); setPassword(""); setConfirmPassword(""); }} className="w-full bg-white text-[#426b1f] p-5 rounded-2xl font-bold text-xl shadow-lg mt-8">
                  Volver a Iniciar Sesión
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {flow === "registro" && (
          <AnimatePresence mode="wait">
            {regPaso === 1 && (
              <motion.div key="r1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <p className="text-center text-green-100 mb-8 font-medium text-lg">Selecciona tu método de registro</p>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleRegMetodo("email")} className="w-full bg-white text-[#426b1f] p-5 rounded-2xl font-bold text-xl flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full"><Mail className="w-6 h-6 text-[#426b1f]" /></div>
                    Usar Correo
                  </div>
                  <span className="text-gray-400">→</span>
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleRegMetodo("externo")} className="w-full bg-white text-[#426b1f] p-5 rounded-2xl font-bold text-xl flex items-center justify-between shadow-lg opacity-90">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full"><Smartphone className="w-6 h-6 text-[#426b1f]" /></div>
                    Apple / Google
                  </div>
                  <span className="text-gray-400">→</span>
                </motion.button>
              </motion.div>
            )}

            {regPaso === 2 && (
              <motion.form key="r2" onSubmit={handleRegVerificar} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <p className="text-center text-green-100 mb-8 font-medium text-lg">Introduce tus datos</p>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Correo electrónico" className="w-full p-5 rounded-2xl font-medium text-lg text-gray-900 bg-white shadow-inner outline-none focus:ring-4 focus:ring-green-300 placeholder-gray-400" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Contraseña" className="w-full p-5 rounded-2xl font-medium text-lg text-gray-900 bg-white shadow-inner outline-none focus:ring-4 focus:ring-green-300 placeholder-gray-400" />
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-green-900 text-white p-5 rounded-2xl font-bold text-xl mt-4 shadow-lg border border-green-700">
                  Continuar
                </motion.button>
              </motion.form>
            )}

            {regPaso === 3 && (
              <motion.div key="r3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <p className="text-center text-green-100 mb-6 font-medium text-lg">Selecciona tu perfil para empezar</p>
                {[
                  { id: "/customer", label: "Cliente", icon: User },
                  { id: "/farmer", label: "Agricultor", icon: Store },
                  { id: "/delivery", label: "Repartidor", icon: Truck }
                ].map(rol => (
                  <motion.button key={rol.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setRolSeleccionado(rol.id as any)} className={`w-full p-5 rounded-2xl font-bold text-xl flex items-center justify-between shadow-lg transition-all ${rolSeleccionado === rol.id ? "bg-green-900 text-white ring-4 ring-green-400" : "bg-white text-[#426b1f]"}`}>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${rolSeleccionado === rol.id ? "bg-green-800" : "bg-green-100"}`}>
                        <rol.icon className={`w-6 h-6 ${rolSeleccionado === rol.id ? "text-white" : "text-[#426b1f]"}`} />
                      </div>
                      {rol.label}
                    </div>
                    {rolSeleccionado === rol.id ? <CheckCircle2 className="w-6 h-6 text-green-300" /> : <span className="text-gray-400">→</span>}
                  </motion.button>
                ))}

                <div className="flex items-center gap-3 pt-4 px-2">
                  <input type="checkbox" id="regterms" checked={terminos} onChange={e => setTerminos(e.target.checked)} className="w-6 h-6 rounded border-gray-300 text-green-900 focus:ring-green-900 accent-green-900" />
                  <label htmlFor="regterms" className="text-sm font-medium text-green-50">Acepto los términos y condiciones de la aplicación.</label>
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleRegFinalizar} className="w-full bg-green-900 text-white p-5 rounded-2xl font-bold text-xl mt-4 shadow-lg border border-green-700">
                  Confirmar y Entrar
                </motion.button>
              </motion.div>
            )}

            {regPaso === 4 && (
              <motion.div key="r4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center mt-12 space-y-6">
                <div className="w-24 h-24 bg-white text-[#426b1f] rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">¡Cuenta Creada!</h2>
                  <p className="text-green-100 font-medium mt-4 text-lg">Hemos enviado un email de confirmación a:<br /><strong className="text-white mt-1 block">{email}</strong></p>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate(rolSeleccionado)} className="w-full bg-white text-[#426b1f] p-5 rounded-2xl font-bold text-xl shadow-lg mt-8">
                  Ir a la Aplicación
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}