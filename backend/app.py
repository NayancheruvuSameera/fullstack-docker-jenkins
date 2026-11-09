
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Flask backend is running"
    })

@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy"
    }), 200

@app.route("/submit", methods=["POST"])
def submit():

    data = request.get_json(silent=True) or {}

    name = data.get("name")
    email = data.get("email")
    course = data.get("course")

    if not all([name, email, course]):
        return jsonify({
            "message": "All fields are required"
        }), 400

    print("Received student details:")
    print("Name:", name)
    print("Email:", email)
    print("Course:", course)

    return jsonify({
        "message": "Student registration successful!",
        "student": {
            "name": name,
            "email": email,
            "course": course
        }
    }), 200


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000
    )
