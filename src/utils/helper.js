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

export const calculateDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  if (!match) {
    return "---";
  }

  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const seconds = match[3] ? parseInt(match[3], 10) : 0;

  const formattedHours = hours > 0 ? `${hours}:` : "";
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${formattedHours}${minutes}:${formattedSeconds}`;
};

export const countViews = (numCount) => {
  const count = Number(numCount);
  if (count < 1000) {
    return `${count}`;
  } else if (count < 1000000) {
    return `${Math.floor(count / 1000)}K`;
  } else if (count < 1000000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else {
    return `${(count / 1000000000).toFixed(1)}B`;
  }
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
