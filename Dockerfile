FROM node:18.16.0 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --force --silent
RUN npm install react-scripts@5.0.1 -g --silent
COPY . ./

RUN npm install --save @lottiefiles/react-lottie-player
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
