// Définit le type d'un objet utilisateur
export interface User {
    pseudo: string;
    email: string;
    motdepasse: string;
    role: "admin" | "utilisateur";
  }
  
  // Définit le type d'un formulaire de connexion
  export interface LoginFormData {
    email: string;
    motdepasse: string;
    role: "admin" | "utilisateur";
  }
  