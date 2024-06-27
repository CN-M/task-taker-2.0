# Use the official Node.js 18 image as a base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN pnpm run prisma generate

# Build TypeScript code
RUN pnpm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/server.js"]
