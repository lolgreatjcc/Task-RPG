import React from 'react'
import { View, Text, Dimensions, StyleSheet, Image, ImageBackground } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
const SLIDER_WIDTH = Dimensions.get('window').width + 80
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const data = [
  {
    id: 1,
    name: "ADHD",
    fact: "ADHD is one of the most common neurodevelopmental disorders of childhood.",
    p1: "Create space",
    p2: "Ask yourself what you need on a daily basis",
    p3: "Make use of lists and notes to keep track of regularly scheduled tasks",
  },
  {
    id: 2,
    name: "Anxiety",
    fact: "Anxiety disorders differ from normal feelings of nervousness or anxiousness, and involve excessive fear or anxiety.",
    p1: "Journaling",
    p2: "Deep-breathing techniques",
    p3: "Aroma Therapy",
  },
  {
    id: 3,
    name: "Procrastination",
    fact: "Procrastination is the act of delaying or putting off tasks until the last minute, or past their deadline.",
    p1: "Promise yourself a reward.",
    p2: "Rephrase your internal dialog.",
    p3: "Ask someone to check up on you.",
  },
  {
    id: 4,
    name: "Depression",
    fact: "Depression (major depressive disorder) is a common and serious medical illness that negatively affects how you feel, the way you think and how you act.",
    p1: "Learn How to Stop Negative Thoughts",
    p2: "Improve Your Eating Habits",
    p3: "Improve Your Sleep Hygiene",
  },
];

const CarouselCardItem = ({ item, index }) => {
  return (
      <View style={styles.aboutMonsterBox} key={index}>
        <Text style={styles.aboutMonsterHeader}>
          What is {item.name}:
        </Text>
        <Text>{item.fact}{'\n'}</Text>
        <Text style={styles.aboutMonsterHeader}>
          Here are some ways to cope with {item.name}:
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>• </Text>
          <Text>{item.p1}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>• </Text>
          <Text>{item.p2}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>• </Text>
          <Text>{item.p3}</Text>
        </View>
      </View>
  )
}
const CarouselCards = () => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)


  return (
    <View>
      <Carousel
        layout="tinder"
        layoutCardOffset={5}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  aboutMonsterBox: {
    height: 220,
    borderRadius: 6,
    marginTop: 20,
    padding: 24,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "white"
  },
  aboutMonsterHeader: {
    fontWeight: "bold"
  },
})
export default CarouselCards;