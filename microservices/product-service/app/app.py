import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins
# Retrieve database path from the environment variable
database_path = os.getenv("DATABASE_PATH", "/app/Database/ecommerce.db")
print(f"Database Path: {database_path}")  # Debugging the database path
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{database_path}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# Database models
class categories(db.Model):
    category_id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "category_id": self.category_id,
            "category_name": self.category_name,
            "description": self.description
        }

class suppliers(db.Model):
    supplier_id = db.Column(db.Integer, primary_key=True)
    supplier_name = db.Column(db.String(255), nullable=False)
    contact_info = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "supplier_id": self.supplier_id,
            "supplier_name": self.supplier_name,
            "contact_info": self.contact_info
        }

class products(db.Model):
    product_id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(255), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.category_id"))
    category = db.relationship("categories", foreign_keys=[category_id])
    cost_price = db.Column(db.Float, nullable=False)
    sales_price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)
    product_image = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "product_id": self.product_id,
            "product_name": self.product_name,
            "category": self.category.category_name,
            "cost_price": self.cost_price,
            "sales_price": self.sales_price,
            "description": self.description,
            "product_image": self.product_image
        }

class stock_levels(db.Model):
    inventory_id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.product_id"))
    product = db.relationship("products", foreign_keys=[product_id])
    purchase_date = db.Column(db.Date, nullable=False)
    quantity_purchased = db.Column(db.Integer, nullable=False)
    quantity_sold = db.Column(db.Integer, nullable=False)
    outstanding_stock = db.Column(db.Integer, nullable=False)
    supplier_id = db.Column(db.Integer, db.ForeignKey("suppliers.supplier_id"))
    supplier = db.relationship("suppliers", foreign_keys=[supplier_id])
    reorder_level = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "inventory_id": self.inventory_id,
            "products": self.product.to_dict(),
            "purchase_date": str(self.purchase_date),
            "quantity_purchased": self.quantity_purchased,
            "quantity_sold": self.quantity_sold,
            "outstanding_stock": self.outstanding_stock,
            "supplier": self.supplier.to_dict(),
            "reorder_level": self.reorder_level
        }

# Routes
@app.route("/products", methods=["GET"])
def get_products():
    product_list = products.query.all()
    result = [product.to_dict() for product in product_list]
    return jsonify(result)

@app.route("/products/<int:product_id>", methods=["GET"])
def get_product_id(product_id):
    product = products.query.get(product_id)
    if product:
        return jsonify(product.to_dict())
    return jsonify({"error": "Product not found"}), 404

@app.route("/categories", methods=["GET"])
def get_categories():
    categories_list = categories.query.all()
    return jsonify([category.to_dict() for category in categories_list])

@app.route("/suppliers", methods=["GET"])
def get_suppliers():
    suppliers_list = suppliers.query.all()
    return jsonify([supplier.to_dict() for supplier in suppliers_list])

@app.route("/stock-levels", methods=["GET"])
def get_stock_levels():
    stock_levels_list = stock_levels.query.all()
    return jsonify([stock_level.to_dict() for stock_level in stock_levels_list])

if __name__ == "__main__":
    with app.app_context():
        pass  # Prevent db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=True)
