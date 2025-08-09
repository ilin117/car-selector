import requests
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template("index.html")

@app.route("/api/v1/car-makes", methods=["GET"])
def get_car_makes():
    r = requests.get("https://carapi.app/api/makes/v2")
    return r.json()

@app.route("/api/v1/car-models/<car_make>", methods=["GET"])
def get_car_models(car_make):
    r = requests.get(f"https://carapi.app/api/models/v2?make={car_make}")
    return r.json()

if __name__ == "__main__":
    app.run(debug=True)