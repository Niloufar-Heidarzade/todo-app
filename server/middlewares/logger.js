const logger = async (req , res , next) => {
  try {
    console.log(`request route is : ${req.url} and request method is : ${req.method}`);
    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = logger;