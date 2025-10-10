
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
];

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

