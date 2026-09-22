const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req,res,next)).catch(next)
module.exports = asyncHandler

// In an effort to never have to create another try catch block to copy and paste it we have created a wrapper function