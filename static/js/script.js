var model_dropdown = document.getElementById("car_model");
var make_dropdown = document.getElementById("car_make");
var car_image_div = document.getElementById("car-image-container");

axios.get("api/v1/car-makes").then(function (response) {
    let car_makes = response.data.data;
    car_makes.forEach((element) => {
        make_dropdown.innerHTML += `<option value="${element.name}">${element.name}</option>`;
    });
});

make_dropdown.addEventListener("change", function () {
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
    car_image_div.innerHTML = "";
    axios
        .get(`/api/v1/car-image/${make_dropdown.value}/${model_dropdown.value}`)
        .then(function (response) {
            car_image_div.innerHTML += response.data;
        });
});
