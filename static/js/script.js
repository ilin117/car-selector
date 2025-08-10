var model_dropdown = document.getElementById("car_model");
var make_dropdown = document.getElementById("car_make");
var car_image_div = document.getElementById("car-image-container");

// document.addEventListener("change", function () {
//     console.log(model_dropdown.value);
// });

axios.get("api/v1/car-makes").then(function (response) {
    let car_makes = response.data.data;
    car_makes.forEach((element) => {
        make_dropdown.innerHTML += `<option value="${element.name}">${element.name}</option>`;
    });
});

make_dropdown.addEventListener("change", function () {
    car_image_div.innerHTML = "";
    model_dropdown.innerHTML = '<option value="empty"></option>';
    axios
        .get(`/api/v1/car-models/${make_dropdown.value}`)
        .then(function (response) {
            let car_models = response.data.data;
            car_models.forEach(function (element) {
                model_dropdown.innerHTML += `<option value="${element.name}">${element.name}</option>`;
            });
        });
});

model_dropdown.addEventListener("change", function () {
    car_image_div.innerHTML = "<p>Fetching images...</p>";

    axios
        .get(`/api/v1/car-image/${make_dropdown.value}/${model_dropdown.value}`)
        .then(function (response) {
            car_image_div.innerHTML = "";
            car_images = response.data.images;
            car_images.forEach(function (element) {
                const car_image = document.createElement("img");
                car_image.src = element;
                car_image.style.width = "270px";
                car_image.style.height = "auto";
                car_image_div.appendChild(car_image);
            });
        });
});
