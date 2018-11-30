# 第一阶段npm-build
FROM node:alpine AS npm-builder
ADD /src /root/src
ADD package.json /root/package.json
ADD template.html /root/template.html
ADD webpack.config.js /root/webpack.config.js

WORKDIR /root
RUN npm install
RUN npm run build
RUN ls


# 第二阶段上传
FROM wen911119/oss-uploader
COPY --from=npm-builder /root/dist /bundle
ARG region
ARG accessKeyId
ARG accessKeySecret
ARG bucket
RUN ls /bundle
RUN node index.js
