
import arrowUp from "@/assets/icons/arrow-up.png";
import backArrow from "@/assets/icons/back-arrow.png";
import chat from "@/assets/icons/chat.png";
import checkmark from "@/assets/icons/check.png";
import close from "@/assets/icons/close.png";
import dollar from "@/assets/icons/dollar.png";
import email from "@/assets/icons/email.png";
import google from "@/assets/icons/google.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import lock from "@/assets/icons/lock.png";
import map from "@/assets/icons/map.png";
import marker from "@/assets/icons/marker.png";
import out from "@/assets/icons/out.png";
import person from "@/assets/icons/person.png";
import pin from "@/assets/icons/pin.png";
import point from "@/assets/icons/point.png";
import profile from "@/assets/icons/profile.png";
import search from "@/assets/icons/search.png";
import selectedMarker from "@/assets/icons/selected-marker.png";
import star from "@/assets/icons/star.png";
import target from "@/assets/icons/target.png";
import to from "@/assets/icons/to.png";
import tick from "@/assets/icons/charm_tick.png";
import upload from "@/assets/icons/upload.png";
import camera from "@/assets/icons/camera.png";
import gallery from "@/assets/icons/gallery.png";
import trash from "@/assets/icons/trash.png";
import check from "@/assets/images/check.png";
import clothing from "@/assets/images/clothing.jpg";
import dorm from "@/assets/images/dorm.jpg";
import tech from "@/assets/images/technology.jpg";
import books from "@/assets/images/textbooks.jpg";
import sports from "@/assets/images/sports.jpg" ;

export const images1 = {
  check
}
export const icons = {

  arrowUp,
  backArrow,
  chat,
  checkmark,
  close,
  dollar,
  upload,
  email,
  google,
  home,
  list,
  camera,
  gallery,
  trash,
  lock,
  map,
  marker,
  out,
  tick,
  person,
  pin,
  point,
  profile,
  search,
  selectedMarker,
  star,
  target,
  to,
};


// images.ts
export const images = {
  sports: require('@/assets/images/sports.jpg'),
  books: require('@/assets/images/textbooks.jpg'),
  electronics: require('@/assets/images/technology.jpg'),
  clothes: require('@/assets/images/clothing.jpg'),
  furniture: require('@/assets/images/dorm.jpg'),
};

// popularCategories.ts
export const popularCategories = [
  { id: '1', name: 'Sports', imageKey: 'sports' },
  { id: '2', name: 'Books', imageKey: 'books' },
  { id: '3', name: 'Electronics', imageKey: 'electronics' },
  { id: '4', name: 'Clothes', imageKey: 'clothes' },
  { id: '5', name: 'Furniture', imageKey: 'furniture' },
]

// mocks/listings.ts
export const mockListings = Array.from({ length: 50 }).map((_, i) => ({
  id: i.toString(),
  title: `Listing #${i + 1}`,
  price: `$${(Math.random() * 100).toFixed(2)}`,
  image: "https://picsum.photos/400/300?random=" + i,
  user: {
    name: `User ${i + 1}`,
    avatar: "https://i.pravatar.cc/40?img=" + i,
  },
}));

export const mockMessages = [
  {
    "conversationId": "c1",
    "userId": 101,
    "name": "Alex Johnson",
    "profileImage": "https://randomuser.me/api/portraits/men/32.jpg",
    "lastMessage": "Hey, is this still available?",
    "date": "2025-01-10T14:32:00Z"
  },
  {
    "conversationId": "c2",
    "userId": 102,
    "name": "Maria Gonzalez",
    "profileImage": "https://randomuser.me/api/portraits/women/45.jpg",
    "lastMessage": "Can you do $120 for it?",
    "date": "2025-01-10T13:18:00Z"
  },
  {
    "conversationId": "c3",
    "userId": 103,
    "name": "Daniel Smith",
    "profileImage": "https://randomuser.me/api/portraits/men/76.jpg",
    "lastMessage": "I can pick it up tomorrow morning.",
    "date": "2025-01-09T19:44:00Z"
  },
  {
    "conversationId": "c4",
    "userId": 104,
    "name": "Sophia Lee",
    "profileImage": "https://randomuser.me/api/portraits/women/12.jpg",
    "lastMessage": "Thanks! See you then 👍",
    "date": "2025-01-09T16:02:00Z"
  },
  {
    "conversationId": "c5",
    "userId": 105,
    "name": "Michael Brown",
    "profileImage": "https://randomuser.me/api/portraits/men/18.jpg",
    "lastMessage": "Is the price negotiable?",
    "date": "2025-01-08T21:27:00Z"
  },
  {
    "conversationId": "c6",
    "userId": 106,
    "name": "Emily Carter",
    "profileImage": "https://randomuser.me/api/portraits/women/29.jpg",
    "lastMessage": "I’ve sent the payment.",
    "date": "2025-01-08T10:55:00Z"
  },
  {
    "conversationId": "c7",
    "userId": 107,
    "name": "Ryan Wilson",
    "profileImage": "https://randomuser.me/api/portraits/men/54.jpg",
    "lastMessage": "Can you ship it?",
    "date": "2025-01-07T18:41:00Z"
  },
  {
    "conversationId": "c8",
    "userId": 108,
    "name": "Olivia Martin",
    "profileImage": "https://randomuser.me/api/portraits/women/67.jpg",
    "lastMessage": "Perfect, I’ll take it.",
    "date": "2025-01-07T09:12:00Z"
  },
  {
    "conversationId": "c9",
    "userId": 103,
    "name": "Daniel Smith",
    "profileImage": "https://randomuser.me/api/portraits/men/76.jpg",
    "lastMessage": "I can pick it up tomorrow morning.",
    "date": "2025-01-09T19:44:00Z"
  },
  {
    "conversationId": "c10",
    "userId": 104,
    "name": "Sophia Lee",
    "profileImage": "https://randomuser.me/api/portraits/women/12.jpg",
    "lastMessage": "Thanks! See you then 👍",
    "date": "2025-01-09T16:02:00Z"
  },
  {
    "conversationId": "c11",
    "userId": 105,
    "name": "Michael Brown",
    "profileImage": "https://randomuser.me/api/portraits/men/18.jpg",
    "lastMessage": "Is the price negotiable?",
    "date": "2025-01-08T21:27:00Z"
  },
  {
    "conversationId": "c12",
    "userId": 106,
    "name": "Emily Carter",
    "profileImage": "https://randomuser.me/api/portraits/women/29.jpg",
    "lastMessage": "I’ve sent the payment.",
    "date": "2025-01-08T10:55:00Z"
  },
  {
    "conversationId": "c13",
    "userId": 107,
    "name": "Ryan Wilson",
    "profileImage": "https://randomuser.me/api/portraits/men/54.jpg",
    "lastMessage": "Can you ship it?",
    "date": "2025-01-07T18:41:00Z"
  },
  {
    "conversationId": "c14",
    "userId": 108,
    "name": "Olivia Martin",
    "profileImage": "https://randomuser.me/api/portraits/women/67.jpg",
    "lastMessage": "Perfect, I’ll take it.",
    "date": "2025-01-07T09:12:00Z"
  }
]
