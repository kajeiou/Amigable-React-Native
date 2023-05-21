export class Post {
  constructor(
    id,
    content,
    userId,
    createdAt,
    likes,
    comments,
    imageURL,
    isPublic,
    attachments,
    isEdited,
    user
  ) {
    this.id = id; // Identifiant du post
    this.content = content; // Contenu du post
    this.userId = userId; // ID de l'utilisateur qui a écrit le post
    this.createdAt = createdAt; // Date de création du post
    this.likes = likes || []; // Tableau des utilisateurs qui ont liké le post
    this.comments = comments || []; // Tableau des commentaires associés au post
    this.imageURL = imageURL; // URL de l'image associée au post
    this.isPublic = isPublic; // Indicateur si le post est public ou privé
    this.attachments = attachments || []; // Tableau des pièces jointes ou fichiers associés au post
    this.isEdited = isEdited; // Indicateur si le post a été édité après sa création initiale
    this.user = user;
  }
}
