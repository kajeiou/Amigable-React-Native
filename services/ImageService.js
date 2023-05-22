import { getStorage, ref, getDownloadURL,uploadBytes, getMetadata  } from 'firebase/storage';

const ImageService = {
  
    checkImageAvailability: async (imageURIs) => {
      const storage = getStorage();
  
      const availabilityPromises = imageURIs.map(async (imageURI) => {
        const imageRef = ref(storage, imageURI);
        try {
          await getMetadata(imageRef);
          return true; // L'image est disponible
        } catch (error) {
          console.log(`[Image Service] Image not found: ${imageURI}`);
          return false; // L'image n'est pas disponible
        }
      });
  
      const availabilityResults = await Promise.all(availabilityPromises);
      return availabilityResults;
    }
  };
  
  export default ImageService;
  