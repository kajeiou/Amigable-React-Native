export class User {
    constructor(
      uid = '',
      email = '',
      displayName = '',
      phoneNumber = '',
      createdAt = '',
      photoURL = '',
      biography = '',
      lastLogin = '',
      emailVerified = false
    ) {
      this.uid = uid; // Identifiant unique de l'utilisateur
      this.email = email; // Adresse e-mail de l'utilisateur
      this.displayName = displayName; // Nom d'affichage de l'utilisateur
      this.phoneNumber = phoneNumber; // Numéro de téléphone de l'utilisateur
      this.createdAt = createdAt; // Date de création du compte de l'utilisateur
      this.photoURL = photoURL; // URL de l'image de profil de l'utilisateur
      this.biography = biography; // Biographie de l'utilisateur
      this.lastLogin = lastLogin; // Date de la dernière connexion de l'utilisateur
      this.emailVerified = emailVerified; // Indicateur si l'e-mail de l'utilisateur a été vérifié
    }
  }
  