export class Post {
  constructor(
    id,
    content,
    userId,
    createdAt,
    likes,
    comments,
    imageURIs,
    isPublic,
    attachments,
    isEdited,
    user,
  ) {
    this.id = id;
    this.content = content; 
    this.userId = userId; 
    this.createdAt = createdAt; 
    this.likes = likes || []; 
    this.comments = comments || []; 
    this.imageURIs = imageURIs || []; 
    this.isPublic = isPublic; 
    this.attachments = attachments || []; 
    this.isEdited = isEdited; 
    this.user = user;
  }
}
