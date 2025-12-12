import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Charge les variables d’env (y compris depuis Vercel)
  // Le troisième paramètre '' désactive le filtre VITE_ et permet de récupérer OPENAI_API_KEY
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
    plugins: [react()],
    define: {
      // C’est ça qui alimente process.env.API_KEY dans ton code
      "process.env.API_KEY": JSON.stringify(env.OPENAI_API_KEY),
      "process.env.OPENAI_API_KEY": JSON.stringify(env.OPENAI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
