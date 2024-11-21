# Dockerfile for Product Service

# Use an official Python image as the base
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Install dependencies
RUN pip install \
    Flask==2.0.3 \
    Flask-SQLAlchemy==2.5.1 \
    SQLAlchemy==1.4.36 \
    Flask-Cors==3.0.10 \
    Werkzeug==2.1.2

# Copy the current directory contents into the container at /app
COPY app/ .

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run app.py when the container launches
CMD ["python", "app.py"]