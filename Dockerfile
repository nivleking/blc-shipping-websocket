FROM node:20.11-alpine3.19

WORKDIR /app/websockets

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

EXPOSE 6001

CMD ["npm", "start"]