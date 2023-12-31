const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function formatDate(date: string) {
  const x = new Date(date);
  const day = x.getDate();
  const month = x.getMonth();
  const year = x.getFullYear();
  
  return `${monthNames[month]} ${day} ${year}`;
}