# Dockerfile for Analytics Service

# Use an official Python image as the base
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Install dependencies
RUN pip install --no-cache-dir \
    pandas==1.4.2 \
    fastapi==0.115.5 \
    uvicorn==0.32.0

# Copy the current directory contents into the container at /app
COPY app/ .

# Expose port 5003 to allow external connections
EXPOSE 5003

# Run the analytics service when the container launches
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "5003"]
