FROM node:alpine

WORKDIR /app


COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the server listens on
EXPOSE 3000

# Set the command to start the Node server
CMD ["npm", "start"]