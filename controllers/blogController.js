const BlogSchema = require("../model/blogModel");
const cloudnery = require("../config/cloudnery");
const fs = require("fs");
const { log } = require("console");

module.exports = {
  GetHomepage: async (req, res) => {
    try {
      const blog = await BlogSchema.find({}, { title: 1, image: 1 })
        .sort({ _id: -1 })
        .limit(3);
      console.log();
      res.json({ blog, status: true });
    } catch (err) {}
  },
  AddBlog: async (req, res) => {
    try {
      const { category, title } = req.body;
      let img;
      console.log(req.file);
      if (req.file) {
        const upload = await cloudnery.cloudinary.uploader.upload(
          req.file?.path,
          { resource_type: "auto" }
        );
        img = upload.secure_url;
        console.log(upload);
        await fs.unlinkSync(req.file.path);
      }

      const success = await BlogSchema.create({
        UserId: 1,
        title,
        category,
        image: img,
      });
      console.log(success);
      if (success) {
        res.json({ status: true, blogId: success._id });
      }
    } catch (err) {
      console.log(err);
    }
  },
  AddblogDescription: async (req, res) => {
    try {
      console.log(req.body);
      const { id, text, type } = req.body;
      let img;
      console.log(req.body);
      console.log(req.file);
      if (req.file) {
        const upload = await cloudnery.cloudinary.uploader.upload(
          req.file?.path,
          { resource_type: "auto" }
        );
        img = upload.secure_url;
        console.log(upload);
        await fs.unlinkSync(req.file.path);
      }
      const update = await BlogSchema.updateOne(
        { _id: id },
        {
          $push: {
            description: { type: type, deatials: { text: text ? text : img } },
          },
        }
      );
      console.log(update);
      if (update) {
        res.json({ status: true });
      }
    } catch (err) {
      console.log(err);
    }
  },
  Getblog: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await BlogSchema.findOne(
        { _id: id },
        { description: 1, title: 1 }
      );
      const blogs = await BlogSchema.find({ UserId: req.User.id });
      console.log(data);
      res.json({
        status: true,
        data: data.description,
        blogs,
        title: data.title,
      });
    } catch (err) {
      console.log(err);
    }
  },
  prevesBlog: async (req, res) => {
    try {
      const data = await BlogSchema.find().sort({ date: -1 });
      if (data.length == 0) {
        res.json({ status: true, id: false });
      } else {
        res.json({ status: true, id: data[0]?._id });
      }
    } catch (err) {}
  },
  GetAllblogs: async (req, res) => {
    try {
      const { page } = req.params;
      const skip = (page - 1) * 9;
      const length = await BlogSchema.find().count();
      const pages = Math.floor(length / 9);
      const blogs = await BlogSchema.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(9);
      res.json({ status: true, pages, blogs });
    } catch (err) {}
  },
  AddRating: async (req, res) => {
    const User = req.User;
    const { id, rate } = req.params;
    const data = await BlogSchema.updateOne(
      { _id: id },
      {
        $inc: { rating: rate },
        $push: { ratings: { User: User._id, rate: rate } },
      }
    );
    console.log(data);
    res.json({ status: true });
  },
  Israted: async (req, res) => {
    try {
      const User = req.User;
      const { id } = req.params;
      const data = await BlogSchema.findOne({
        _id: id,
        "ratings.User": User._id,
      });
      if (data) {
        res.json({ status: true });
      } else {
        res.json({ status: false });
      }
    } catch (err) {}
  },
};
