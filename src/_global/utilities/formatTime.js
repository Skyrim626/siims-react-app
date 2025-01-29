export const formatTime = (time) => {
  const date = new Date(`1970-01-01T${time}:00`);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};