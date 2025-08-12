import requests
from flask import Flask, render_template
from bs4 import BeautifulSoup

app = Flask(__name__)

def fetch_json(url, params=None):
    try:
        r = requests.get(url, params=params)
        r.raise_for_status()
        return r.json()
    except requests.RequestException as e:
        return {"error": str(e)}

@app.route("/")
def hello_world():
    print("Hello World")
    return render_template("index.html")

@app.route("/api/v1/car-makes", methods=["GET"])
def get_car_makes():
    return fetch_json("https://carapi.app/api/makes/v2")

@app.route("/api/v1/car-models/<car_make>", methods=["GET"])
def get_car_models(car_make):
    return fetch_json("https://carapi.app/api/models/v2", {"make": car_make})

@app.route("/api/v1/car-image/<car_make>/<car_model>")
def get_car_picture(car_make, car_model):
    try:
        r = requests.get('https://images.search.yahoo.com/search/images;', params={"p": f"{car_make} {car_model}"})
        r.raise_for_status()
        soup = BeautifulSoup(r.text, 'html.parser')
        all_imgs = [img["data-src"] for img in soup.find_all("img") if img.has_attr("data-src")]
        return {"images": all_imgs[0:4]}
    except requests.RequestException as e:
        return {"error": str(e)}   

@app.route("/test")
def test():
    return test.json

if __name__ == "__main__":
    app.run(debug=True)