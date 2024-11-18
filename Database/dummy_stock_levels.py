import sqlite3
from datetime import datetime, timedelta

# Connect to database
conn = sqlite3.connect('ecommerce.db')
cursor = conn.cursor()

# Suppliers
suppliers = [i for i in range(1, 16)]

# Stock level data
stock_levels = []
start_date = datetime(2022, 1, 1)
for i in range(3, 61):
    product_id = i
    purchase_date = start_date + timedelta(days=i)
    quantity_purchased = i * 2
    quantity_sold = i
    outstanding_stock = quantity_purchased - quantity_sold
    supplier_id = i % 15 + 1  # Rotate suppliers
    reorder_level = i // 2
    stock_levels.append((i, product_id, purchase_date.strftime('%Y-%m-%d'), quantity_purchased, quantity_sold, outstanding_stock, supplier_id, reorder_level))

# Insert stock levels
cursor.executemany('INSERT INTO stock_levels VALUES (?, ?, ?, ?, ?, ?, ?, ?)', stock_levels)
conn.commit()
conn.close()