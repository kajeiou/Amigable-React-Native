import React from 'react';
import { Dimensions, Image, View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

export default function CustomCarousel({ imageURIs }) {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <>
      {imageURIs.length === 1 ? (
        <View key={imageURIs[0]} style={styles.imageContainer}>
          <Image source={{ uri: imageURIs[0] }} style={styles.singleImage} resizeMode="contain" />
          <Text style={styles.carouselText}>1 média</Text>
        </View>
      ) : imageURIs.length > 1 ? (
        <View style={styles.imageContainer}>
          <Carousel
            width={width*0.70}
            height={height*0.50}
            data={imageURIs}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ item, index }) => (
              <View key={index}>
                <Image
                  source={{ uri: item }}
                  style={styles.carouselImage}
                  resizeMode="contain"
                />
              </View>
            )}
            />
            <Text style={styles.carouselText}>{imageURIs.length} médias</Text>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: '100%',
    aspectRatio: 1,
    alignItems:"center"
  },
  singleImageContainer: {
    width: '50%',
    aspectRatio: 1,
  },
  singleImage: {
    width: '100%',
    height: '100%',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  carouselText: {
    fontSize: 10,
    color: '#999999',
    padding:4
  }
});
