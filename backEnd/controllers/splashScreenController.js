exports.getSplashScreen = (req, res) => {
  res.status(200).json({
    status: "success",
    data: 'Hello from the Splash screen'
  })
}