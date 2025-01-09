FROM redaelemawy20/node-ffmpeg

WORKDIR /app


# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the server listens on
EXPOSE 8002

# Set the command to start the Node server
CMD ["nodemon", "--legacy-watch", "index.js"]

