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
      emailVerified = false,
    ) {
      this.uid = uid; 
      this.email = email; 
      this.displayName = displayName; 
      this.phoneNumber = phoneNumber; 
      this.createdAt = createdAt; 
      this.photoURL = photoURL; 
      this.biography = biography; 
      this.lastLogin = lastLogin; 
      this.emailVerified = emailVerified; 
    }
  }
  