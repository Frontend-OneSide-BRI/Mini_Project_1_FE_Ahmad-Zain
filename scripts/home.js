// Fetch the JSON data
fetch("../scripts/data.json")
  .then((response) => response.json())
  .then((data) => {
    const photoGallery = document.querySelector("#photoGallery .row");

    const foodPhotos = document.querySelector("#foodPhotos");
    const galaxyPhotos = document.querySelector("#galaxyPhotos");
    const fantasyPhotos = document.querySelector("#fantasyPhotos");

    // Map the data to generate HTML for each photo
    const photoItems = data.data.map((photo) => {
      const col = document.createElement("div");
      col.classList.add("col");

      const image = document.createElement("img");
      image.src = photo.image;
      image.alt = photo.title;
      image.classList.add("img-fluid");

      const caption = document.createElement("div");
      caption.classList.add("caption");
      const title = document.createElement("h5");
      title.textContent = photo.title;
      const captionText = document.createElement("p");
      captionText.textContent = photo.caption;
      caption.appendChild(title);
      caption.appendChild(captionText);

      col.appendChild(image);
      col.appendChild(caption);

      return col;
    });

    photoItems.forEach((item) => {
      photoGallery.appendChild(item);
    });

    data.data.forEach((photo) => {
      const col = document.createElement("div");
      col.classList.add("col");

      const image = document.createElement("img");
      image.src = photo.image;
      image.alt = photo.title;
      image.classList.add("img-fluid");

      const caption = document.createElement("div");
      caption.classList.add("caption");
      const title = document.createElement("h5");
      title.textContent = photo.title;
      const captionText = document.createElement("p");
      captionText.textContent = photo.caption;
      caption.appendChild(title);
      caption.appendChild(captionText);

      col.appendChild(image);
      col.appendChild(caption);

      if (photo.category === "food") {
        foodPhotos.appendChild(col);
      } else if (photo.category === "galaxy") {
        galaxyPhotos.appendChild(col);
      } else if (photo.category === "fantasy") {
        fantasyPhotos.appendChild(col);
      }
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
