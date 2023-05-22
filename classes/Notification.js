export class Notification {
  constructor(
    id,
    type,
    message,
    FromUserId,
    ToUserId,
    postId,
    createdAt,
    viewed,
    ToUser,
    FromUser
  ) {
    this.id = id;
    this.type = type;
    this.message = message;
    this.FromUserId = FromUserId; // Correction : Utiliser le paramètre FromUser plutôt que FromUserId
    this.ToUserId = ToUserId;
    this.postId = postId;
    this.createdAt = createdAt;
    this.viewed = viewed || false;
    this.ToUser = ToUser;
    this.FromUser = FromUser;
  }
}
