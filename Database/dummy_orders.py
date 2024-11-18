import sqlite3
from datetime import datetime, timedelta

# Connect to database
conn = sqlite3.connect('ecommerce.db')
cursor = conn.cursor()

# Customers
customers = [f'customer{i}@email.com' for i in range(1, 101)]

# Order data
orders = []
start_date = datetime(2022, 1, 1)
for i in range(1, 101):
    order_id = i
    order_date = start_date + timedelta(days=i)
    email = customers[i % 100]  # Rotate customers
    total_amount = round(i * 50, 2)
    shipping_cost = round(i * 0.5, 2)
    tax_amount = round(i * 0.25, 2)
    status = ['Pending', 'Shipped', 'Delivered'][i % 3]  # Rotate status
    orders.append((order_id, order_date.strftime('%Y-%m-%d'), email, total_amount, shipping_cost, tax_amount, status))

# Insert orders
cursor.executemany('INSERT INTO orders VALUES (?, ?, ?, ?, ?, ?, ?)', orders)
conn.commit()
conn.close()