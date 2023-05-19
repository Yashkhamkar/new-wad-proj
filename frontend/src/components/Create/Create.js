import React, { useEffect } from "react";
import classes from "./create.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import swal from "sweetalert";

const Create = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [review, setReview] = useState("");
  const [pic, setPic] = useState();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user.isAdmin === false) {
      swal("Only Admin is allowed access");
      navigate("/");
    }
  }, [user]);

  const handleCloseImg = () => {
    setImage("");
  };
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!image || !title || !desc || !category || !price || !review) {
      return swal({
        text: "Please fill all fields",
        icon: "warning",
      });
    }
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "Food-Delivery");
      data.append("cloud_name", "xash");
      fetch("https://api.cloudinary.com/v1_1/xash/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.secure_url);
        })
        .catch((err) => {
          console.log(err);
        });
      const res = await fetch(`/product`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          category,
          img: pic,
          price,
          review,
        }),
      });

      const food = await res.json();

      navigate(`/food/${food._id}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Link to="/" className={classes.returns}>
        <BiArrowBack /> Go back Home
      </Link>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h2 className={classes.title}>Create recepie book</h2>
          <form onSubmit={handleCreateProduct} encType="multipart/form-data">
            <div className={classes.inputWrapper}>
              <label>Title: </label>
              <input
                type="text"
                placeholder="Title..."
                className={classes.input}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={classes.inputWrapper}>
              <label>Description: </label>
              <input
                type="text"
                placeholder="Description..."
                className={classes.input}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className={classes.inputWrapper}>
              <label>Category: </label>
              <input
                type="text"
                placeholder="Category..."
                className={classes.input}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            </div>
            <div className={classes.inputWrapperImage}>
              <label htmlFor="image" className={classes.labelFileInput}>
                Image: <span>Upload here</span>
              </label>
              <input
                type="file"
                id="image"
                placeholder="Image..."
                className={classes.input}
                onChange={(e) => setImage(e.target.files[0])}
                style={{ display: "none" }}
              />
              {image && (
                <p className={classes.imageName}>
                  {image.name}{" "}
                  <AiOutlineCloseCircle
                    onClick={handleCloseImg}
                    className={classes.closeIcon}
                  />
                </p>
              )}
            </div>
            <div className={classes.inputWrapper}>
              <label>Price: </label>
              <input
                type="number"
                step={0.01}
                placeholder="Price..."
                className={classes.input}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className={classes.inputWrapper}>
              <label>Review: </label>
              <input
                type="number"
                step={0.1}
                min={1}
                max={5}
                placeholder="Review..."
                className={classes.input}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <div className={classes.buttonWrapper}>
              <button type="submit" className={classes.submitBtn}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
