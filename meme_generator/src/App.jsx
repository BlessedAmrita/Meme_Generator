import './App.css'
import React from "react"

export default function App() {
  const [formData, setFormData] = React.useState({
    topText: "",
    bottomText: "",
    url: "https://i.imgflip.com/39t1o.jpg",
  });

  const [memesData, setMemesData] = React.useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemesData(data.data.memes));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }

  function handleClick() {
    const num = Math.floor(Math.random() * memesData.length);
    const url = memesData[num].url;
    setFormData((prevFormData) => ({ ...prevFormData, url: url }));
  }

  return (
      <div className="main-box">
        <header className="header">
          <h1>Meme Generator</h1>
          <img src="" alt="" />
        </header>
        <div>
          <form className="form-data" onSubmit={handleSubmit}>
            <label htmlFor="topText">Top Text</label>
            <input
              type="text"
              id="topText"
              name="topText"
              value={formData.topText}
              onChange={handleChange}
            ></input>
            <label htmlFor="bottomText">Bottom Text</label>
            <input
              type="text"
              id="bottomText"
              name="bottomText"
              value={formData.bottomText}
              onChange={handleChange}
            ></input>
            <button onClick={handleClick} id="memeButton">
              Get Meme Image
            </button>
          </form>
          <div className="image-box">
            <p className="image-top-text">{formData.topText}</p>
            <img src={formData.url} alt="meme_img" />
            <p className="image-bottom-text">{formData.bottomText}</p>
          </div>
        </div>
      </div>
  );
}
