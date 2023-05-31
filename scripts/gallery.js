document.addEventListener("DOMContentLoaded", function () {
  fetch("../scripts/data.json")
    .then((response) => response.json())
    .then((data) => {
      const gallery = document.getElementById("gallery");

      const createPhotoCard = (image, caption, title, category) => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";

        const img = document.createElement("img");
        img.src = image;
        img.className = "img-fluid";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = title;

        const cardCaption = document.createElement("p");
        cardCaption.className = "card-text";
        cardCaption.textContent = caption;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardCaption);

        card.appendChild(img);
        card.appendChild(cardBody);

        gallery.appendChild(card);
      };

      const displayPhotosByCategory = (category) => {
        gallery.innerHTML = "";

        const categoryLinks = document.querySelectorAll(".dropdown-item");
        categoryLinks.forEach((link) => {
          link.classList.remove("active");
          link.classList.remove("text-white");
          link.classList.remove("bg-gradient");
          link.classList.remove("bg-black");
          link.classList.add("text-secondary");
          link.classList.add("bg-none");
        });

        const activeLink = document.querySelector(
          `.dropdown-item[data-category="${category}"]`
        );
        activeLink.classList.remove("text-secondary");
        activeLink.classList.remove("bg-none");
        activeLink.classList.add("active");
        activeLink.classList.add("text-white");
        activeLink.classList.add("bg-gradient");
        activeLink.classList.add("bg-black");

        if (category === "all") {
          data.data.forEach((photo) => {
            createPhotoCard(
              photo.image,
              photo.caption,
              photo.title,
              photo.category
            );
          });
        } else {
          const filteredPhotos = data.data.filter(
            (photo) => photo.category === category
          );
          filteredPhotos.forEach((photo) => {
            createPhotoCard(
              photo.image,
              photo.caption,
              photo.title,
              photo.category
            );
          });
        }
      };

      const categoryLinks = document.querySelectorAll(".dropdown-item");
      categoryLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          const category = this.getAttribute("data-category");
          displayPhotosByCategory(category);
        });
      });

      const searchInput = document.getElementById("searchInput");
      searchInput.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();

        if (searchTerm.trim() === "") {
          displayPhotosByCategory("all");
        } else {
          const filteredPhotos = data.data.filter((photo) => {
            const title = photo.title.toLowerCase();
            const caption = photo.caption.toLowerCase();
            return title.includes(searchTerm) || caption.includes(searchTerm);
          });
          gallery.innerHTML = "";

          filteredPhotos.forEach((photo) => {
            createPhotoCard(
              photo.image,
              photo.caption,
              photo.title,
              photo.category
            );
          });
        }
      });

      displayPhotosByCategory("all");
    })
    .catch((error) => console.error("Error fetching data:", error));
});
