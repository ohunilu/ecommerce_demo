import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) # Allow all origins
# Retrieve database path from the environment variable for containerized use
database_path = os.getenv("DATABASE_PATH", "/app/Database/ecommerce.db")
print(f"Database Path: {database_path}")  # Debugging database path
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{database_path}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


# Database models
class Orders(db.Model):
    order_id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.Date, nullable=False)
    email = db.Column(db.String(255), db.ForeignKey("users.email"))
    user = db.relationship("Users", foreign_keys=[email])
    total_amount = db.Column(db.Float, nullable=False)
    shipping_cost = db.Column(db.Float, nullable=False)
    tax_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        user_dict = self.user.to_dict() if self.user else None
        return {
            "order_id": self.order_id,
            "order_date": str(self.order_date),
            "email": self.email,
            "total_amount": self.total_amount,
            "shipping_cost": self.shipping_cost,
            "tax_amount": self.tax_amount,
            "status": self.status,
            "user": user_dict,
        }


class OrderDetail(db.Model):
    order_item_id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.order_id"))
    order = db.relationship("Orders", foreign_keys=[order_id])
    product_id = db.Column(db.Integer, db.ForeignKey("products.product_id"))
    product = db.relationship("Products", foreign_keys=[product_id])
    quantity = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    discount = db.Column(db.Float, nullable=False)

    def to_dict(self):
        order_dict = self.order.to_dict() if self.order else None
        product_dict = self.product.to_dict() if self.product else None
        return {
            "order_item_id": self.order_item_id,
            "order": order_dict,
            "product": product_dict,
            "quantity": self.quantity,
            "total_price": self.total_price,
            "discount": self.discount,
        }


class Users(db.Model):
    email = db.Column(db.String(255), primary_key=True)
    user_name = db.Column(db.String(255), nullable=False)
    user_password = db.Column(db.String(255), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey("roles.role_id"))
    role = db.relationship("Roles", foreign_keys=[role_id])

    def to_dict(self):
        role_dict = self.role.to_dict() if self.role else None
        return {
            "email": self.email,
            "user_name": self.user_name,
            "role": role_dict,
        }


class Products(db.Model):
    product_id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "product_id": self.product_id,
            "product_name": self.product_name,
        }


class Roles(db.Model):
    role_id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "role_id": self.role_id,
            "role_name": self.role_name,
            "description": self.description,
        }


# Routes
@app.route("/orders", methods=["GET"])
def get_orders():
    orders = Orders.query.all()
    orders_dict = []
    for order in orders:
        if order:
            try:
                orders_dict.append(order.to_dict())
            except AttributeError as e:
                print(f"Error processing order {order.order_id}: {e}")
        else:
            print("Skipping None order")
    return jsonify(orders_dict)


@app.route("/orders/<int:order_id>", methods=["GET"])
def get_order(order_id):
    order = Orders.query.get(order_id)
    if order:
        return jsonify(order.to_dict())
    return jsonify({"error": "Order not found"}), 404


if __name__ == "__main__":
    with app.app_context():
        pass  # Prevent db.create_all() to avoid overwriting existing data
    app.run(host="0.0.0.0", port=5001, debug=True)
