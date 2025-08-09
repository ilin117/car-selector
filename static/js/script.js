var model_dropdown = document.getElementById("car_model");
var make_dropdown = document.getElementById("car_make");

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
            console.log(response);
            let car_models = response.data.data;
            car_models.forEach(function (element) {
                model_dropdown.innerHTML += `<option value="${element.name}">${element.name}</option>`;
            });
        });
});
