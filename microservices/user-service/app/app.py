import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins
# Retrieve database path from the environment variable for containerized use
database_path = os.getenv("DATABASE_PATH", "/app/Database/ecommerce.db")
print(f"Database Path: {database_path}")  # Debugging the database path
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{database_path}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# Database models
class Role(db.Model):
    __tablename__ = "roles"
    role_id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "role_id": self.role_id,
            "role_name": self.role_name,
            "description": self.description,
        }


class User(db.Model):
    __tablename__ = "users"
    email = db.Column(db.String(255), primary_key=True)
    user_name = db.Column(db.String(255), nullable=False)
    user_password = db.Column(db.String(255), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey("roles.role_id"))
    role = db.relationship("Role", foreign_keys=[role_id])

    def to_dict(self):
        return {
            "email": self.email,
            "user_name": self.user_name,
            "role": self.role.to_dict(),
        }


# Routes
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])


@app.route("/users/<string:email>", methods=["GET"])
def get_user(email):
    user = User.query.get(email)
    if user:
        return jsonify(user.to_dict())
    return jsonify({"error": "User not found"}), 404


if __name__ == "__main__":
    with app.app_context():
        pass  # Prevent db.create_all() to avoid overwriting existing data
    app.run(host="0.0.0.0", port=5002, debug=True)
