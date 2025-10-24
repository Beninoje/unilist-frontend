import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const uploadImage = async (file:any) => {
  if (!file) return null;

  const filename = `${Date.now()}_${file.name}`;
  const storageRef = ref(storage, filename);

  await uploadBytes(storageRef, file); // upload file
  const downloadUrl = await getDownloadURL(storageRef); // get public URL

  return downloadUrl;
};
