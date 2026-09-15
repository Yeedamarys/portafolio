import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
}

const contactMessages: ContactMessage[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime(), time: new Date().toISOString() });
  });

  app.get("/api/profile", (_req, res) => {
    res.json({
      name: "Damarys León",
      title: "Desarrolladora Full Stack",
      tagline: "Construyo soluciones digitales que combinan tecnología, creatividad y propósito.",
      location: "Quito, Ecuador",
      phone: "+593 995515379",
      email: "damarysleon88@gmail.com",
      status: "Disponible para trabajar",
      experienceYears: "2+",
      education: {
        degree: "Ingeniería en Software",
        university: "Universidad de las Fuerzas Armadas ESPE",
        period: "2022 - Presente (Octavo Nivel)",
      },
    });
  });

  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Por favor complete nombre, correo y mensaje." });
    }

    const newMessage: ContactMessage = {
      id: "msg_" + Date.now(),
      name: String(name).trim(),
      email: String(email).trim(),
      subject: subject ? String(subject).trim() : "Contacto Portafolio",
      message: String(message).trim(),
      createdAt: new Date().toISOString(),
    };

    contactMessages.push(newMessage);
    console.log(`[Contact] New inquiry from ${newMessage.name} <${newMessage.email}>`);

    return res.status(200).json({
      success: true,
      message: "¡Gracias por comunicarte! He recibido tu mensaje y me pondré en contacto contigo a la brevedad.",
      data: newMessage,
    });
  });

  // CV metadata & download endpoint
  app.get("/api/cv", (_req, res) => {
    res.json({
      name: "Damarys León",
      role: "Desarrolladora Full Stack",
      location: "Quito, Ecuador",
      phone: "+593 995515379",
      email: "damarysleon88@gmail.com",
      status: "Disponible para trabajar",
      summary:
        "Desarrolladora Full Stack con experiencia entregando módulos administrativos y sitios web en producción, integrando arquitecturas limpias, autenticación y servicios en la nube (Cloudinary). He trabajado en la personalización de plataformas ERP (Odoo), el desarrollo de paneles administrativos en tiempo real y la implementación de facturación electrónica conectada al SRI.",
      skills: [
        { category: "Mobile", items: ["Flutter", "Android Studio"] },
        { category: "Patrones", items: ["Clean Architecture", "SOLID", "Clean Code"] },
        { category: "Backend", items: ["Node.js", "Express", "Laravel", "Spring Boot"] },
        { category: "Frontend", items: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "Bootstrap"] },
        { category: "Lenguajes", items: ["Java", "JavaScript", "TypeScript", "Python", "C#", "C++"] },
        { category: "Cloud & Integraciones", items: ["REST API", "Cloudinary", "Facturación SRI", "JWT"] },
        { category: "Bases de Datos & DevOps", items: ["PostgreSQL", "MySQL", "MongoDB", "phpMyAdmin", "Docker", "CI/CD", "Git/GitHub"] },
        { category: "Metodologías", items: ["Scrum", "Kanban", "Jira"] },
      ],
      experience: [
        {
          period: "2026 (Septiembre)",
          company: "Narubi",
          project: "Sistema de Facturación / Punto de Venta",
          role: "Desarrolladora Full Stack",
          highlights: [
            "Desarrollé el panel administrativo del sistema de facturación y punto de venta.",
            "Implementé la firma electrónica conectada con el SRI para la generación de facturas.",
            "Utilicé REST API, Cloudinary, arquitectura limpia y JWT para la autenticación segura.",
            "Colaboré bajo metodología ágil, gestionando el trabajo con Jira.",
          ],
        },
        {
          period: "Agosto 2026",
          company: "Perfor Construcciones",
          project: "Sitio Web Empresarial & CMS en Tiempo Real",
          role: "Desarrolladora Full Stack",
          highlights: [
            "Desarrollé una página web con sección informativa y módulo administrativo donde el admin modifica pantallas en tiempo real.",
            "Permite gestionar imágenes, información, contacto, ubicación y agregar nuevos módulos dinámicamente.",
            "Integré el servicio de Cloudinary para optimizar el rendimiento en la carga de imágenes.",
          ],
        },
        {
          period: "2025",
          company: "SODI CORP S.A.S",
          project: "Módulo Administrativo ERP (Odoo 17)",
          role: "Desarrolladora Full Stack",
          highlights: [
            "Colaboré en las modificaciones de diseño de la página web de la empresa.",
            "Desarrollé e implementé funciones en el módulo administrativo utilizando Odoo 17.",
            "Contribuí a mejorar la organización de los datos y la fiabilidad del sistema para los procesos administrativos internos.",
          ],
        },
      ],
      education: {
        career: "Ingeniería en Software",
        institution: "Universidad de las Fuerzas Armadas ESPE",
        status: "2022 - Presente (Octavo Nivel)",
      },
      languages: [
        { language: "Español", level: "Nativo" },
        { language: "Inglés", level: "B2 (Intermedio Avanzado)" },
      ],
    });
  });

  // Vite middleware for development vs production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portafolio Server corriendo en http://localhost:${PORT}`);
  });
}

startServer();
