export class Comment {
    constructor(
      id ,
      content,
      userId,
      createdAt,
      likes,
      user
    ) {
        this.id = id; 
        this.content = content; 
        this.userId = userId; 
        this.createdAt = createdAt;
        this.likes = likes || [];
        this.user = user
    }
  }
  