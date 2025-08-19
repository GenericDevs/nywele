# # Use a Node.js base image
# FROM node:18-alpine

# WORKDIR /app

# COPY package.json package-lock.json* ./
# RUN npm install

# # Copy the rest of the code
# COPY . .

# # Generate Prisma Client inside container
# RUN npx prisma generate
# # RUN npx prisma migrate dev --name init
# EXPOSE 3000
# CMD ["npm", "run", "dev"]


# ///////////////////deplyment/////////////////////
# Use a Node.js base image
# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install ALL dependencies (including devDependencies) for the build
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client inside container
RUN npx prisma generate

# Build the app (now with all dev dependencies available)
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine AS runner

WORKDIR /app

# Only copy necessary files for a production environment
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env ./.env

# The prisma migrate deploy command needs the Prisma schema
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# Use production start
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]