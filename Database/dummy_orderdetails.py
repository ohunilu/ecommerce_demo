import sqlite3

# Connect to database
conn = sqlite3.connect('ecommerce.db')
cursor = conn.cursor()

# Products
products = [i for i in range(1, 61)]

# Order details data
order_details = []
for i in range(1, 301):
    order_item_id = i
    order_id = i % 100 + 1  # Rotate orders
    product_id = i % 60 + 1  # Rotate products
    quantity = i % 5 + 1
    total_price = round(quantity * (product_id * 0.5), 2)
    discount = round(total_price * 0.1, 2)
    order_details.append((order_item_id, order_id, product_id, quantity, total_price, discount))

# Insert order details
cursor.executemany('INSERT INTO order_details VALUES (?, ?, ?, ?, ?, ?)', order_details)
conn.commit()
conn.close()