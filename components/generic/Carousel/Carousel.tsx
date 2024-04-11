import {
  Animated,
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import React, { useRef, useState } from "react";
import Pagination from "./CarouselPagination";
import CarouselItem from "./CarouselItem";
const { width, height } = Dimensions.get("screen");

export type CarouselProps<ItemT> = {
  items: ArrayLike<ItemT> | null | undefined;
  renderItem: ListRenderItem<ItemT>;
  onItemDisplayedChanged?: (item: ItemT) => void;
  spaceBetweenItems?: number;
};

export function Carousel<ItemT>({
  items,
  renderItem,
  onItemDisplayedChanged,
  spaceBetweenItems = 10,
}: CarouselProps<ItemT>) {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      //  console.log("viewableItems", viewableItems);
      try {
        if (viewableItems[0]) {
          // console.log("Viewable item", viewableItems[0])
          onItemDisplayedChanged
            ? onItemDisplayedChanged(viewableItems[0].item as ItemT)
            : {};
          setIndex(viewableItems[0]?.index ?? 0);
        }
      } catch (err) {}
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 55,
  }).current;

  return (
    <View style={{ flex: 1, }}>
      <Pagination data={items} scrollX={scrollX} index={index} />
      <View style={{ flex: 1 }}>
        <FlatList

          data={items}
          renderItem={({ ...props }) => (
            <CarouselItem>{renderItem({ ...props })}</CarouselItem>
          )}
          initialScrollIndex={0}
          horizontal
          // ItemSeparatorComponent={() => (
          //   <View style={{ width: spaceBetweenItems }} />
          // )}
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={handleOnScroll}
          onViewableItemsChanged={handleOnViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </View>
    </View>
  );
}
