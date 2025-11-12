import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBEWRpABsy6BxJhJWyBnEThlaIVGU_AYtw",
  authDomain: "billing-application-f49b3.firebaseapp.com",
  projectId: "billing-application-f49b3",
  storageBucket: "billing-application-f49b3.appspot.com",
  messagingSenderId: "555095007899",
  appId: "1:555095007899:web:a8ac74d1630239c7ea9c3e",
  measurementId: "G-XCH9DKCRWH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const MENU = [
  {
    id: "idli",
    name: "Idli (1 Set)",
    price: 5,
    photo: "https://images.unsplash.com/photo-1604908176997-431651c01f9b?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "dosa",
    name: "Dosa",
    price: 5,
    photo: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "parata",
    name: "Parata",
    price: 5,
    photo: "https://images.unsplash.com/photo-1601050690597-9e1f4c61b7a3?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "uttappam",
    name: "Uttappam",
    price: 9,
    photo: "https://images.unsplash.com/photo-1623172964314-95db1c7623c4?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "onion-uttappam",
    name: "Onion Uttappam",
    price: 13,
    photo: "https://images.unsplash.com/photo-1613573628855-5a6f9b7c0823?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "egg-uttappam",
    name: "Egg Uttappam",
    price: 13,
    photo: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "egg-roast",
    name: "Egg Roast",
    price: 13,
    photo: "https://images.unsplash.com/photo-1604908553727-7f41a9bc9b13?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "nehi-roast",
    name: "Nehi Roast",
    price: 13,
    photo: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "roast",
    name: "Roast",
    price: 9,
    photo: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "mutta-parata",
    name: "Mutta Parata",
    price: 15,
    photo: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "veech-parata",
    name: "Veech Parata",
    price: 6,
    photo: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "egg-veech-parata",
    name: "Egg Veech Parata",
    price: 9,
    photo: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "omelet",
    name: "Omelet",
    price: 5,
    photo: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "half-boil",
    name: "Half Boil",
    price: 4,
    photo: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "kalki",
    name: "Kalki / Loose Boil",
    price: 4,
    photo: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "full-boil",
    name: "Full Boil",
    price: 4,
    photo: "https://images.unsplash.com/photo-1515549832467-8783363e19b6?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "mutta-porial",
    name: "Mutta Porial",
    price: 6,
    photo: "https://images.unsplash.com/photo-1625944525971-9e3eb2d646f2?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "puri-set",
    name: "Puri Set",
    price: 10,
    photo: "https://images.unsplash.com/photo-1626138336657-b111d1b746c5?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "pongal",
    name: "Pongal",
    price: 10,
    photo: "https://images.unsplash.com/photo-1604908176997-431651c01f9b?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "khichidi",
    name: "Khichidi",
    price: 10,
    photo: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "semiya",
    name: "Semiya",
    price: 10,
    photo: "https://images.unsplash.com/photo-1546549039-49a6b75a2bff?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "upma",
    name: "Upma",
    price: 10,
    photo: "https://images.unsplash.com/photo-1543339308-43f2b83f27a7?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "veg-biryani",
    name: "Veg Biryani",
    price: 20,
    photo: "https://images.unsplash.com/photo-1604908553549-4c772316bed3?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "plain-biryani",
    name: "Plain Biryani",
    price: 15,
    photo: "https://images.unsplash.com/photo-1542027955-3ba38a6873a1?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    price: 30,
    photo: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "egg-biryani-double",
    name: "Egg Biryani (Double)",
    price: 25,
    photo: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "chicken-rice",
    name: "Chicken Rice",
    price: 25,
    photo: "https://images.unsplash.com/photo-1605470145765-9d6b9f96c1af?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "egg-rice",
    name: "Egg Rice",
    price: 20,
    photo: "https://images.unsplash.com/photo-1543339308-43f2b83f27a7?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "veg-rice",
    name: "Veg Rice",
    price: 15,
    photo: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "chicken-season-rice",
    name: "Chicken Season Rice",
    price: 30,
    photo: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "egg-season-rice",
    name: "Egg Season Rice",
    price: 25,
    photo: "https://images.unsplash.com/photo-1543339308-43f2b83f27a7?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "veg-season-rice",
    name: "Veg Season Rice",
    price: 20,
    photo: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "chicken-noodles",
    name: "Chicken Noodles",
    price: 25,
    photo: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "egg-noodles",
    name: "Egg Noodles",
    price: 20,
    photo: "https://images.unsplash.com/photo-1604908553727-7f41a9bc9b13?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "veg-noodles",
    name: "Veg Noodles",
    price: 15,
    photo: "https://images.unsplash.com/photo-1478749485505-2a903a729c63?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "chicken-season-noodles",
    name: "Chicken Season Noodles",
    price: 30,
    photo: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "egg-season-noodles",
    name: "Egg Season Noodles",
    price: 25,
    photo: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "veg-season-noodles",
    name: "Veg Season Noodles",
    price: 20,
    photo: "https://images.unsplash.com/photo-1478749485505-2a903a729c63?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "chicken-manchurian",
    name: "Chicken Manchurian",
    price: 25,
    photo: "https://images.unsplash.com/photo-1601050690597-9e1f4c61b7a3?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "chicken-monica",
    name: "Chicken Monica",
    price: 30,
    photo: "https://images.unsplash.com/photo-1604908176997-431651c01f9b?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "chicken-fry",
    name: "Chicken Fry",
    price: 25,
    photo: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "gobi-manchurian",
    name: "Gobi Manchurian",
    price: 20,
    photo: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "mushroom-manchurian",
    name: "Mushroom Manchurian",
    price: 25,
    photo: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "chilly-chicken-boneless",
    name: "Chilly Chicken (Boneless)",
    price: 25,
    photo: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "chicken-65",
    name: "Chicken 65",
    price: 30,
    photo: "https://images.unsplash.com/photo-1604908553727-7f41a9bc9b13?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "kovai-special-chicken",
    name: "Kovai Special Chicken",
    price: 25,
    photo: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "baby-corn-manchurian",
    name: "Baby Corn Manchurian",
    price: 25,
    photo: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "baby-corn-chilly",
    name: "Baby Corn Chilly",
    price: 20,
    photo: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "chilly-gobi",
    name: "Chilly Gobi",
    price: 20,
    photo: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "mushroom-chilly",
    name: "Mushroom Chilly",
    price: 20,
    photo: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "chilly-fish",
    name: "Chilly Fish",
    price: 25,
    photo: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800",
    cat: "South Indian Food"
  },
  {
    id: "nan",
    name: "Nan",
    price: 7,
    photo: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800",
    cat: "Tandoori Roti & Romali"
  },
  {
    id: "butter-nan",
    name: "Butter Nan",
    price: 10,
    photo: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800",
    cat: "Tandoori Roti & Romali"
  },
  {
    id: "veg-nan",
    name: "Veg Nan",
    price: 12,
    photo: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800",
    cat: "Tandoori Roti & Romali"
  },
  {
    id: "garlic-nan",
    name: "Garlic Nan",
    price: 13,
    photo: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800",
    cat: "Tandoori Roti & Romali"
  },
  {
    id: "kulcha",
    name: "Kulcha",
    price: 8,
    photo: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800",
    cat: "Tandoori Roti & Romali"
  },
  {
    id: "butter-kulcha",
    name: "Butter Kulcha",
    price: 10,
    photo: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800",
    cat: "Tandoori Roti & Romali"
  },
  {
    id: "lachha-parata",
    name: "Lachha Parata",
    price: 15,
    photo: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800",
    cat: "Tandoori Roti & Romali"
  },
  {
    id: "romali-roti",
    name: "Romali Roti",
    price: 7,
    photo: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800",
    cat: "Tandoori Roti & Romali"
  },
  {
    id: "tandoori-roti",
    name: "Tandoori Roti",
    price: 8,
    photo: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800",
    cat: "Tandoori Roti & Romali"
  },
  {
    id: "tandoori-parata",
    name: "Tandoori Parata",
    price: 12,
    photo: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800",
    cat: "Tandoori Roti & Romali"
  },
  {
    id: "veg-gravy",
    name: "Veg Gravy",
    price: 25,
    photo: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
    cat: "Gravy (Side Dish)"
  },
  {
    id: "channa-masala",
    name: "Channa Masala",
    price: 25,
    photo: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=800",
    cat: "Gravy (Side Dish)"
  },
  {
    id: "gobi-masala",
    name: "Gobi Masala",
    price: 25,
    photo: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800",
    cat: "Gravy (Side Dish)"
  },
  {
    id: "green-peas-masala",
    name: "Green Peas Masala",
    price: 25,
    photo: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
    cat: "Gravy (Side Dish)"
  },
  {
    id: "paneer-butter-masala",
    name: "Panneer Butter Masala",
    price: 30,
    photo: "https://images.unsplash.com/photo-1604908553727-7f41a9bc9b13?q=80&w=800",
    cat: "Gravy (Side Dish)"
  },
  {
    id: "kadai-veg",
    name: "Kadai Vegetable",
    price: 30,
    photo: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800",
    cat: "Gravy (Side Dish)"
  },
  {
    id: "kadai-paneer",
    name: "Kadai Paneer",
    price: 35,
    photo: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800",
    cat: "Gravy (Side Dish)"
  },
  {
    id: "mushroom-masala",
    name: "Mushroom Masala",
    price: 30,
    photo: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800",
    cat: "Gravy (Side Dish)"
  },
  {
    id: "baby-corn-masala",
    name: "Baby Corn Masala",
    price: 25,
    photo: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800",
    cat: "Gravy (Side Dish)"
  },
  {
    id: "alu-gobi-masala",
    name: "Alu Gobi Masala",
    price: 25,
    photo: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800",
    cat: "Gravy (Side Dish)"
  },
  {
    id: "chicken-masala",
    name: "Chicken Masala",
    price: 30,
    photo: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
    cat: "Chicken Items"
  },
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    price: 35,
    photo: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
    cat: "Chicken Items"
  },
  {
    id: "garlic-chicken",
    name: "Garlic Chicken",
    price: 35,
    photo: "https://images.unsplash.com/photo-1604908553727-7f41a9bc9b13?q=80&w=800",
    cat: "Chicken Items"
  },
  {
    id: "ginger-chicken",
    name: "Ginger Chicken",
    price: 35,
    photo: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
    cat: "Chicken Items"
  },
  {
    id: "kadai-chicken",
    name: "Kadai Chicken",
    price: 35,
    photo: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800",
    cat: "Chicken Items"
  },
  {
    id: "hyderabad-chicken",
    name: "Hyderabad Chicken",
    price: 35,
    photo: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
    cat: "Chicken Items"
  },
  {
    id: "chicken-curry",
    name: "Chicken Curry",
    price: 40,
    photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800",
    cat: "Chicken Items"
  },
  {
    id: "egg-masala",
    name: "Egg Masala",
    price: 30,
    photo: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800",
    cat: "Chicken Items"
  },
  {
    id: "chicken-chettinad",
    name: "Chicken Chettinad",
    price: 35,
    photo: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800",
    cat: "Chicken Items"
  },
  {
    id: "chicken-lollypop-2",
    name: "Chicken Lollypop (2 Nos)",
    price: 15,
    photo: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
    cat: "Chicken Items"
  },
  {
    id: "veg-spring-roll",
    name: "Veg Spring Roll",
    price: 20,
    photo: "https://images.unsplash.com/photo-1568051243858-02bd3d1f4f6f?q=80&w=800",
    cat: "Chicken Items"
  },
  {
    id: "chicken-spring-roll",
    name: "Chicken Spring Roll",
    price: 25,
    photo: "https://images.unsplash.com/photo-1568051243858-02bd3d1f4f6f?q=80&w=800",
    cat: "Chicken Items"
  },
  {
    id: "american-chops",
    name: "American Chops",
    price: 30,
    photo: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800",
    cat: "Chicken Items"
  },
  {
    id: "tomato-soup",
    name: "Tomato Soup",
    price: 10,
    photo: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
    cat: "Soups"
  },
  {
    id: "veg-clear-soup",
    name: "Veg Clear Soup",
    price: 8,
    photo: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800",
    cat: "Soups"
  },
  {
    id: "chicken-clear-soup",
    name: "Chicken Clear Soup",
    price: 10,
    photo: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800",
    cat: "Soups"
  },
  {
    id: "pepper-clear-soup",
    name: "Pepper Clear Soup",
    price: 8,
    photo: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800",
    cat: "Soups"
  },
  {
    id: "sweet-corn-veg-soup",
    name: "Sweet Corn Veg Soup",
    price: 8,
    photo: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800",
    cat: "Soups"
  },
  {
    id: "chicken-soup",
    name: "Chicken Soup",
    price: 10,
    photo: "https://images.unsplash.com/photo-1601050690597-9e1f4c61b7a3?q=80&w=800",
    cat: "Soups"
  }
];

export const categories = [
  "South Indian Food",
  "Tandoori Roti & Romali",
  "Gravy (Side Dish)",
  "Chicken Items",
  "Soups"
];

export function formatMoney(value) {
  return value.toFixed(2);
}

export function totalOf(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export async function createOrder(payload) {
  return addDoc(collection(db, "orders"), {
    ...payload,
    status: "new",
    createdAt: serverTimestamp()
  });
}

export function listenOrders(callback) {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  return onSnapshot(q, snapshot => {
    callback(snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() })));
  });
}

export async function setStatus(id, status) {
  await updateDoc(doc(db, "orders", id), { status });
}
