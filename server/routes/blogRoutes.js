const router = require("express").Router();
const {
  getAllBlogs,
  getBlogsByUserID,
  getBlogByID,
  createBlog,
  addComment,
  deleteBlogByID,
} = require("../controllers/blogControllers");
const requireAuth = require('../middleware/requireAuth')

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const uniquePreffix = Date.now() + "-" + Math.floor(Math.random() * 20);
    cb(null, file.fieldname + uniquePreffix);
  },
});

const upload = multer({ storage: storage });

router.use(requireAuth)

// get all blogs
router.get("/", getAllBlogs);

// get blogs by user id
router.get("user-blogs/:id", getBlogsByUserID);
    
// get blog by id
router.get("/:id", getBlogByID);

// create a blog
router.post("/create", upload.single('image') ,createBlog);

// add comment to a blog
router.post("/blog/:id", addComment);

// delete a blog by id
router.delete("/:id", deleteBlogByID);

module.exports = router;
