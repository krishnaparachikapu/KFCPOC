/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import assets from './../assets';
import products from './../inventory'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const PAGE_WIDTH = windowWidth;

const fabStyle = {
  top: windowHeight * 0.33,
  right: windowHeight * 0.37,
};

const baseOptions = false
  ? {
      vertical: true,
      width: PAGE_WIDTH,
      height: PAGE_WIDTH / 2,
    }
  : {
      vertical: false,
      width: PAGE_WIDTH,
      height: PAGE_WIDTH / 2,
    };
/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const CartContainer = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const addToCartAnimationTop = useRef(
    new Animated.Value(fabStyle.top),
  ).current;
  const [addToCartAnimationRight, setAddToCartAnimationRight] = useState(
    new Animated.Value(fabStyle.right),
  );
  const [addToCartAnimationAlpha, setAddToCartAnimationAlpha] = useState(
    new Animated.Value(0),
  );
  const [addToCartAnimationHeight, setAddToCartAnimationHeight] = useState(
    new Animated.Value(0),
  );
  const [addToCartAnimationWidth, setAddToCartAnimationWidth] = useState(
    new Animated.Value(0),
  );
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));
  const [cartValue, setCartValue] = useState(0);
  

  const renderItem = index => {
    let item = products[index];
    // console.log(item);
    return (
      <View style={styles.product}>
        <Image source={item.courousel_icon} style={styles.productImage} />
        <View style={{flex: 1, marginTop: '20%', marginRight: '10%'}}>
          <Text
            style={{
              color: '#FF5D79',
              fontSize: 35,
              textTransform: 'uppercase',
              textAlign: 'right',
              fontWeight: 'bold',
            }}>
            {item.name}
          </Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}} />
            <Text style={{color: '#FF5D79', fontSize: 25, textAlign: 'right'}}>
              {item.price + '$'}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const addToCart = () => {
    let x = windowWidth * 0.3;
    let y = windowHeight * 0.5;
    let width = 2;
    let height = 2;
    let duratioin = 1000;
    Animated.parallel([
      Animated.timing(addToCartAnimationAlpha, {
        toValue: 1,
        duration: duratioin,
        useNativeDriver: true,
      }),
      Animated.timing(addToCartAnimationTop, {
        toValue: y,
        duration: duratioin,
        useNativeDriver: true,
      }),
      Animated.timing(addToCartAnimationRight, {
        toValue: x,
        duration: duratioin,
        useNativeDriver: true,
      }),
      Animated.timing(addToCartAnimationWidth, {
        toValue: width,
        duration: duratioin,
        useNativeDriver: true,
      }),
      Animated.timing(addToCartAnimationHeight, {
        toValue: height,
        duration: duratioin,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) {
        const cartItems = cartProduct;
        const product = products[currentIndex];
        cartItems.push(product);
        setCartProduct(cartItems);
        setCartValue(cartValue + product["price"]);
        console.log('animation ended!', product["price"]);
        Animated.timing(addToCartAnimationTop, {
          toValue: fabStyle.top,
          duration: 1,
          useNativeDriver: true,
        }).start();
        setAddToCartAnimationAlpha(new Animated.Value(0));
        setAddToCartAnimationRight(new Animated.Value(fabStyle.right));
        setAddToCartAnimationWidth(new Animated.Value(0));
        setAddToCartAnimationHeight(new Animated.Value(0));
      }
    });
  };
  const addToCartAnimatedView = () => {
    let thisAnimateStyle = [
      {
        position: 'absolute',
        opacity: addToCartAnimationAlpha,
        zIndex: 1,
        width: 40,
        height: 40,
      },
      {
        transform: [
          {
            translateX: addToCartAnimationRight,
          },
          {
            translateY: addToCartAnimationTop,
          },
        ],
      },
    ];
    console.log('CCCCCCC\n\n\n', thisAnimateStyle);
    console.log('\n\n\naaaa\n\n\n');
    return (
      <Animated.Image
        source={products[currentIndex].cart_icon}
        style={thisAnimateStyle}
      />
    );
  };
  const addProduct = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          addToCart();
        }}
        style={[
          {
            position: 'absolute',
            right: '10%',
            top: windowHeight * 0.3,
            zIndex: 100,
          },
          styles.addToCar,
        ]}>
        <Image source={assets.addToCartIcon} style={styles.addToCart} />
      </TouchableOpacity>
    );
  };

  const renderProductsInsidePlate = () => {
    if (cartProduct && cartProduct.length > 0) {
      return (
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 90,
          }}>
          <View style={{flex: 0, height: 50, width: 70}}>
            <Image
              source={cartProduct[0].cart_icon}
              style={{width: 100, height: 100, marginBottom: 50}}
            />
          </View>
          {cartProduct.length === 2 ? (
            <View style={{flex: 0, height: 70, width: 70}}>
              <Image
                source={cartProduct[1].cart_icon}
                style={{width: 100, height: 100}}
              />
            </View>
          ) : cartProduct.length >= 3 ? (
            <View style={{flex: 0, height: 70, flexDirection: 'row'}}>
              <Image
                source={cartProduct[1].cart_icon}
                style={{width: 100, height: 100}}
              />
              <Image
                source={cartProduct[2].cart_icon}
                style={{width: 100, height: 100}}
              />
            </View>
          ) : null}
        </View>
      );
    }
  };

  const renderStart = () => {
    const spinDeg = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg'],
    });
    return (
      <Animated.View style={
        {
          zIndex: 0, position: "absolute",
          left: windowWidth * 0.02,
          top: windowHeight * 0.1,
          width: windowHeight * 0.3,
          height: windowHeight * 0.3,
          transform:[{rotate:spinDeg}]
        }}>
        <Animated.Image source={assets.star1}
          style={{ marginLeft: "60%", marginTop: "10%",width:30,height:30,flex:0 }}
        ></Animated.Image>
        <View style={{flex:1}}></View>
        <View style={{ flex: 0, flexDirection: "row",padding:16 }}>
        <Animated.Image source={assets.star1}
          style={{ width:10,height:10 ,flex:0}}
          ></Animated.Image>
          <View style={{flex: 1}}></View>
        <Animated.Image source={assets.star1}
          style={{  width:20,height:20,flex:0 ,marginRight:"20%"}}
        ></Animated.Image>  
        </View>
        
      </Animated.View>
    );
  };

  return (
    <View style={styles.constiner}>
      {renderStart()}
      {addProduct()}
      {addToCartAnimatedView()}
      <View style={styles.navBar}>
        <Image source={assets.topMenuImage1} style={styles.navImage} />
        <Image source={assets.topMenuImage2} style={styles.navImage} />
        <Image source={assets.topMenuImage3} style={styles.navImage} />
        <Image source={assets.topMenuImage4} style={styles.navImage} />
      </View>

      <View style={styles.productsContainer}>
        <Carousel
          withAnimation={{
            type: 'spring',
            config: {
              damping: 13,
            },
          }}
          width={windowWidth}
          loop={true}
          autoPlay={false}
          data={products}
          pagingEnabled={true}
          onSnapToItem={index => setCurrentIndex(index)}
          renderItem={({ index }) => renderItem(index)}
          onProgressChange={(offsetProgress: number, absoluteProgress: number) => {
            console.log('****** absoluteProgress', absoluteProgress);
            let toValue = 0;
            let val = Math.trunc(absoluteProgress * 10) / 10;
            console.log('****** val', val);
            if (absoluteProgress > 2) {
              toValue = absoluteProgress - 2;
            } else if (absoluteProgress > 1) {
              toValue = absoluteProgress - 1;
            } else {
              toValue = absoluteProgress;
            }
            console.log('****** absoluteProgress toValue', toValue);
            //setSpinValue(new Animated.Value(toValue));
            Animated.spring(spinValue, {
              toValue: toValue,
              duration: 0,
              useNativeDriver: true,
            }).start();
              // Animated.timing(spinValue, {
              //   toValue: toValue,
              //   duration: 0,
              //   useNativeDriver: true,
              // }).start();
          }}
        />
      </View>
      <View style={styles.separator}>
        <Image source={assets.separator} style={{flex: 1}} />
      </View>
      <View style={{height: windowHeight * 0.28, alignSelf: 'center'}}>
        {/* <Image source={plate} style={{ marginTop: 70 }}>
          {renderProductsInsidePlate()}
        </Image> */}
        <ImageBackground source={assets.plate} resizeMode="cover" style={styles.plate}>
          {renderProductsInsidePlate()}
        </ImageBackground>
      </View>
      <View style={styles.locationInfo}>
        <View style={{width: windowWidth * 0.1, marginRight: 10}}>
          <Image source={assets.locationPin} />
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              width: windowWidth * 0.7,
              paddingLeft: 10,
              paddingRight: 20,
            }}>
            Donecheng District Metro Cultural Building
          </Text>
        </View>
        <View style={{width: windowWidth * 0.1, marginLeft: 10}}>
          <Image source={assets.phoneIcon} />
        </View>
      </View>

      <View style={styles.paymentInfo}>
        <View
          style={{
            width: windowWidth * 0.65,
            alignItems: 'flex-start',
            height: '100%',
            flexDirection: "row",
          }}>
          <Text style={{fontSize: 40, marginLeft: '15%', marginTop: '5%' }}>
            {cartValue}
          </Text>
          <Text style={{fontSize: 25, marginTop: '10%'}}>
            $
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#FF5D79',
            width: windowWidth * 0.35,
            height: '100%',
          }}>
          <Text
            style={{
              fontSize: 35,
              color: 'white',
              textAlign: 'center',
              marginTop: '10%',
            }}>
            Pay
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  constiner: {
    flex: 1,
    // flexDirection: 'column',
  },
  separator: {
    flexDirection: 'row',
  },
  navBar: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: windowHeight * 0.09,
    backgroundColor: '#FF5D79',
    flexDirection: 'row',
  },
  navImage: {
    tintColor: '#ffffff',
    marginLeft: '10%',
  },
  productsContainer: {
    width: windowWidth,
    height: windowHeight * 0.35,
    // backgroundColor: '#green',
  },
  product: {
    width: windowWidth,
    // height: windowHeight * 0.4,
    flexDirection: 'row',
    paddingLeft: 10,
    // backgroundColor: '#green',
  },
  productImage: {
    // height: windowHeight * 0.4,
    width: windowWidth * 0.5,
  },
  plate: {
    marginTop: 70,
    height: 120,
    width: windowWidth * 0.7,
    // justifyContent: 'center',
    alignItems: 'auto',
  },
  addToCart: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.2,
  },
  locationInfo: {
    marginTop: 10,
    marginLeft: '10%',
    marginRight: '10%',
    height: windowHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  paymentInfo: {
    // flexDirection: "row",
    marginTop: 10,
    height: windowHeight * 0.08,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CartContainer;
