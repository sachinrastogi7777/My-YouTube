import moment from "moment";

export const timeDiff = (date1, date2) => {
  let diff = moment.preciseDiff(date1, date2, true);
  return diff.years
    ? diff.years > 1
      ? diff.years + " years ago"
      : diff.years + " year ago"
    : diff.months
    ? diff.months > 1
      ? diff.months + " months ago"
      : diff.months + " month ago"
    : diff.days
    ? diff.days > 1
      ? diff.days + " days ago"
      : diff.days + " day ago"
    : diff.hours
    ? diff.hours > 1
      ? diff.hours + " hours ago"
      : diff.hours + " hour ago"
    : diff.minutes
    ? diff.minutes > 1
      ? diff.minutes + " minutes ago"
      : diff.minutes + " minute ago"
    : diff.seconds > 1
    ? diff.seconds + " seconds ago"
    : diff.seconds + " second ago";
};

const firstNames = [
  "Aarav",
  "Aditi",
  "Akshay",
  "Amit",
  "Ananya",
  "Arjun",
  "Avani",
  "Bhavya",
  "Chetan",
  "Devi",
  "Divya",
  "Gaurav",
  "Isha",
  "Kiran",
  "Manoj",
  "Neha",
  "Preeti",
  "Rajesh",
  "Riya",
  "Shreya",
  "Varun",
  "Saurabh",
  "Ajay",
  "Sandip",
  "Sadan",
  "Jyoti",
  "Sapna",
  "Prem",
];
const lastNames = [
  "Agarwal",
  "Bansal",
  "Chopra",
  "Gupta",
  "Jain",
  "Kapoor",
  "Mehta",
  "Patel",
  "Rao",
  "Sharma",
  "Singh",
  "Trivedi",
  "Verma",
  "Yadav",
];

var messageList = [
  "Good Morning 🌄",
  "VK 💯 loading 🏏",
  "Sachin is 🐐",
  "Hiii",
  "Welcome to Live Stream!!!",
  "Congratulation to India for Succesfull Chandrayan 🚀 misson.",
  "Today is Ind VS Pak 🏏",
  "Hello Everyone 🤩",
  "I love 🧑‍💻 in ReactJs 😍",
  "One day I'll definetly crack Product Based Company",
  "Please Like, Share and Subscribe my Channel",
  "Today is Sunday 🤩",
  "Friyaaaaay!!!!!",
  "East or West -> India is Best❣️",
];

export function generateRandomName() {
  const userName =
    firstNames[Math.floor(Math.random() * firstNames.length)] +
    " " +
    lastNames[Math.floor(Math.random() * lastNames.length)];
  return userName;
}

export function generateRandomMesage() {
  return messageList[Math.floor(Math.random() * messageList.length)];
}
