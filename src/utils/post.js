export const isLiked = (likes, userId) => likes?.some(id => id === userId);
