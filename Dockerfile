# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /gestion-imagen-personal-frontend

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the contents of the dist folder to the container
COPY dist/ ./

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]