
module.exports = {
  backgroundGradientFrom: "#FFF",
    backgroundGradientTo: "#FFF",
    fillShadowGradient: '#4d31cf',
    //fillShadowGradientOpacity:1,
    strokeWidth:4,
    decimalPlaces: 0, 
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 26,
      padding: 20,
    },
    propsForDots: {
      r: '1',
    }
    }