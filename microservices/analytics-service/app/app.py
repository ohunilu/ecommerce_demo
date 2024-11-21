from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import pandas as pd

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Correct frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database interaction class
class AnalyticsService:
    def __init__(self, db_name: str):
        self.conn = sqlite3.connect(db_name, check_same_thread=False)
        self.cursor = self.conn.cursor()

    def get_total_revenue(self):
        query = "SELECT SUM(total_amount) FROM orders"
        self.cursor.execute(query)
        result = self.cursor.fetchone()
        return result[0] if result and result[0] else 0.0

    def get_gross_profit(self):
        query = """
        SELECT 
        SUM(gross_profit) AS total_gross_profit
        FROM 
        (
            SELECT 
                p.product_id,
                p.cost_price,
                p.sales_price,
                sq.total_quantity,
                (p.sales_price * sq.total_quantity) AS total_sales,
                (p.cost_price * sq.total_quantity) AS total_cost,
                ((p.sales_price * sq.total_quantity) - (p.cost_price * sq.total_quantity)) AS gross_profit
            FROM 
                products p
            JOIN 
            (
                SELECT 
                    product_id, 
                    SUM(quantity) AS total_quantity
                FROM 
                    order_details
                GROUP BY 
                    product_id
            ) sq
            ON 
                p.product_id = sq.product_id
        ) subquery;
        """
        self.cursor.execute(query)
        result = self.cursor.fetchone()
        return result[0] if result and result[0] else 0.0

    def get_average_order_value(self):
        query = "SELECT AVG(total_amount) FROM orders"
        self.cursor.execute(query)
        result = self.cursor.fetchone()
        return result[0] if result and result[0] else 0.0

    def get_inventory_turnover(self):
        query = """
            SELECT 
                strftime('%Y-%m', sl.purchase_date) as month,
                SUM(sl.quantity_sold) / SUM(sl.quantity_purchased) as turnover
            FROM stock_levels sl
            GROUP BY month
        """
        df = pd.read_sql_query(query, self.conn)
        return df.to_dict('records')

    def get_sales_per_user(self):
        query = """
            SELECT 
                u.email, 
                SUM(o.total_amount) as total_sales
            FROM orders o
            JOIN users u ON o.email = u.email
            GROUP BY u.email
        """
        df = pd.read_sql_query(query, self.conn)
        return df.to_dict('records')

    def get_top_selling_products(self):
        query = """
            SELECT 
                p.product_name, 
                SUM(od.quantity) as quantity_sold
            FROM order_details od
            JOIN products p ON od.product_id = p.product_id
            GROUP BY p.product_name
            ORDER BY quantity_sold DESC
            LIMIT 10
        """
        df = pd.read_sql_query(query, self.conn)
        return df.to_dict('records')

    def get_product_category_sales(self):
        query = """
            SELECT 
                c.category_name, 
                SUM(od.quantity * p.sales_price) as category_sales
            FROM order_details od
            JOIN products p ON od.product_id = p.product_id
            JOIN categories c ON p.category_id = c.category_id
            GROUP BY c.category_name
        """
        df = pd.read_sql_query(query, self.conn)
        return df.to_dict('records')


# Instantiate the analytics service with the database
analytics_service = AnalyticsService("/app/Database/ecommerce.db")

# API endpoints
@app.get("/analytics")
def get_analytics():
    try:
        total_revenue = analytics_service.get_total_revenue()
        gross_profit = analytics_service.get_gross_profit()
        average_order_value = analytics_service.get_average_order_value()
        inventory_turnover = analytics_service.get_inventory_turnover()
        sales_per_user = analytics_service.get_sales_per_user()
        top_selling_products = analytics_service.get_top_selling_products()
        product_category_sales = analytics_service.get_product_category_sales()

        # Keep the variable names consistent
        data = {
            "totalRevenue": total_revenue,
            "grossProfit": gross_profit,
            "averageOrderValue": average_order_value,
            "inventoryTurnover": inventory_turnover,
            "salesPerUser": sales_per_user,
            "topSellingProducts": top_selling_products,
            "productCategorySales": product_category_sales,
        }
        return JSONResponse(content=data, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.get("/")
def root():
    return {"message": "Welcome to the Analytics Service API"}


# Main entry point
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5003)
