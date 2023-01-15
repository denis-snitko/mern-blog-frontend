export const formatDate = (timeStamp) => {
  const date = new Date(timeStamp);
  
  return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
};