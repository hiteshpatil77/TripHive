 // AnimatedCard with smooth, small slide up/down and "insert" effect
  // const AnimatedCard = ({item, index, stacked, dayId}) => {
  //   // Hide the floating card in all columns
  //   const isFloating =
  //     dragging &&
  //     floatingInfo &&
  //     floatingInfo.dayId === dayId &&
  //     floatingInfo.index === index &&
  //     currentDragItem &&
  //     currentDragItem.id === item.id;

  //   if (isFloating) return null;

  //   // Small slide offset for visual feedback
  //   const SLIDE_OFFSET = 15;

  //   // Calculate translateY for "insert" effect
  //   let translateY = 0;
  //   if (
  //     dragging &&
  //     currentDragItem &&
  //     hovered.dayId === dayId &&
  //     hovered.index !== null
  //   ) {
  //     const fromDay = currentDragItem.dayId;
  //     const fromIdx = stacked.findIndex(
  //       i => i.id === currentDragItem.id && dayId === fromDay,
  //     );
  //     const isSameDay = fromDay === dayId;

  //     if (isSameDay) {
  //       // If dragging within the same column
  //       const from = fromIdx;
  //       const to = hovered.index;
  //       if (from < to && index > from && index <= to) {
  //         translateY = -SLIDE_OFFSET;
  //       } else if (from > to && index >= to && index < from) {
  //         translateY = SLIDE_OFFSET;
  //       }
  //     } else if (hovered.dayId === dayId) {
  //       // If dragging to a different column
  //       // Slide down cards at or after the hovered index
  //       if (index >= hovered.index) {
  //         translateY = SLIDE_OFFSET;
  //       }
  //     }
  //   }

  //   // Use useRef to persist the animated value per card
  //   const animatedY = useRef(new Animated.Value(0)).current;

  //   React.useEffect(() => {
  //     if (dragging) {
  //       Animated.timing(animatedY, {
  //         toValue: translateY,
  //         duration: 160,
  //         useNativeDriver: true,
  //       }).start();
  //     } else {
  //       animatedY.setValue(0);
  //     }
  //   }, [translateY, dragging, animatedY]);

  //   const animatedStyle = {
  //     transform: [{translateY: animatedY}],
  //   };
  //   return (
  //     <Animated.View style={animatedStyle}>
  //       <Card item={item} />
  //     </Animated.View>
  //   );
  // };