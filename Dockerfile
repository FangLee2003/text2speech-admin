# 1. Build stage: dùng node 20 để build ứng dụng
FROM node:20 AS builder

# Thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json (nếu có) để cài dependencies
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ code vào container
COPY . .

# Build project (ra thư mục dist)
RUN npm run build

# 2. Production stage: chỉ serve static file build ra
FROM node:20-alpine

# Cài serve để phục vụ file static
RUN npm install -g serve

# Thư mục chứa app
WORKDIR /app

# Copy thư mục build từ builder stage
COPY --from=builder /app/dist ./dist

# Mở port 3000 (serve mặc định chạy trên 3000)
EXPOSE 3000

# Lệnh khởi động serve, phục vụ thư mục dist
CMD ["serve", "-s", "dist", "-l", "3000"]
