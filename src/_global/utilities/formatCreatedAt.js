export const formatCreatedAt = (createdAt) => {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  return new Date(createdAt).toLocaleString('en-US', options);
};