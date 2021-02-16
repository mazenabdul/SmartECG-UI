
module.exports = {
  backgroundGradientFrom: "#FFF",
    backgroundGradientTo: "#e0edff",
    fillShadowGradient: '#4B51FF',
    fillShadowGradientOpacity:1,
    strokeWidth:3,
    decimalPlaces: 2, 
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 26,
      padding: 20, 
    },
    propsForDots: {
      r: "5",
      strokeWidth: "2",
      stroke: "#4B51FF",
      fill: '#FFF'
}}