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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const PAGE_WIDTH = windowWidth;
const topMenuImmage1 = require('./../assets/statusbar_item1.png');
const topMenuImmage2 = require('./../assets/statusbar_item2.png');
const topMenuImmage3 = require('./../assets/statusbar_item3.png');
const topMenuImmage4 = require('./../assets/statusbar_item4.png');
const plate = require('./../assets/cart.png');
const addToCartIcon = require('./../assets/add.png');
const separator = require('./../assets/line.png');
const locationPin = require('./../assets/location_pin.png');
const phoneIcon = require('./../assets/phone.png');
const kfcFries = require('./../assets/kfc_fries.png');

const products = [
  {
    name: 'Fries',
    price: 4,
    courousel_icon: kfcFries,
    cart_icon: require('./../assets/fries_cart.png'),
  },
  {
    name: 'Coffee',
    price: 3,
    courousel_icon: require('./../assets/coke.png'),
    cart_icon: require('./../assets/coke_cart.png'),
  },
  {
    name: 'Burger',
    price: 6,
    courousel_icon: require('./../assets/sandwitch.png'),
    cart_icon: require('./../assets/sandwitch_cart.png'),
  },
];

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
    let initialStyleToStartWithFab = {
      top: windowHeight * 0.3,
      right: 20,
    };
    

   
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
        console.log('add to cart');
        console.log('add to cart currentIndex', currentIndex);
        console.log('add to cart cartProduct', cartProduct);
        console.log('add to cart products',products);
        console.log('add to cart products[currentIndex]',products[currentIndex]);
        const cartItems = cartProduct;
        cartItems.push(products[currentIndex]);
        setCartProduct(cartItems);
        console.log('animation ended!');
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
  const fabButton = () => {
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
        <Image source={addToCartIcon} style={styles.addToCart} />
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
          zIndex: 2, position: "absolute",
          left: windowWidth * 0.02,
          top: windowHeight * 0.1,
          width: windowHeight * 0.3,
          height: windowHeight * 0.3,
          transform:[{rotate:spinDeg}]
        }}>
        <Animated.Image source={require('./../assets/star1.png')}
          style={{ marginLeft: "60%", marginTop: "10%",width:40,height:40,flex:0 }}
        ></Animated.Image>
        <View style={{flex:1}}></View>
        <View style={{ flex: 0, flexDirection: "row",padding:16 }}>
        <Animated.Image source={require('./../assets/star1.png')}
          style={{ width:20,height:20 ,flex:0}}
          ></Animated.Image>
          <View style={{flex: 1}}></View>
        <Animated.Image source={require('./../assets/star1.png')}
          style={{  width:30,height:30,flex:0 ,marginRight:"20%"}}
        ></Animated.Image>  
        </View>
        
      </Animated.View>
    );
  };

  return (
    <View style={styles.constiner}>
      {renderStart()}
      {fabButton()}
      {addToCartAnimatedView()}
      <View style={styles.navBar}>
        <Image source={topMenuImmage1} style={styles.navImage} />
        <Image source={topMenuImmage2} style={styles.navImage} />
        <Image source={topMenuImmage3} style={styles.navImage} />
        <Image source={topMenuImmage4} style={styles.navImage} />
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
        <Image source={separator} style={{flex: 1}} />
      </View>
      <View style={{height: windowHeight * 0.28, alignSelf: 'center'}}>
        {/* <Image source={plate} style={{ marginTop: 70 }}>
          {renderProductsInsidePlate()}
        </Image> */}
        <ImageBackground source={plate} resizeMode="cover" style={styles.plate}>
          {renderProductsInsidePlate()}
        </ImageBackground>
      </View>
      <View style={styles.locationInfo}>
        <View style={{width: windowWidth * 0.1, marginRight: 10}}>
          <Image source={locationPin} />
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
          <Image source={phoneIcon} />
        </View>
      </View>

      <View style={styles.paymentInfo}>
        <View
          style={{
            width: windowWidth * 0.65,
            alignItems: 'flex-start',
            height: '100%',
          }}>
          <Text style={{fontSize: 25, marginLeft: '10%', marginTop: '10%'}}>
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
    // flex: 1,
    marginTop: 10,
    height: windowHeight * 0.08,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CartContainer;
