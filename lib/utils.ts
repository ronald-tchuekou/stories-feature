export const getTimeAgo = (timestamp: number) => {
  const minutes = Math.floor((new Date().getTime() - timestamp) / (1000 * 60));
  const hours = Math.floor(minutes / 60);

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`

  return `${hours}h ago`;
};
