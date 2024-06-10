# Use Node.js 20 image as base
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose port 3001 (if needed)
EXPOSE 3001

# Command to start the application
CMD ["npm", "start"]
