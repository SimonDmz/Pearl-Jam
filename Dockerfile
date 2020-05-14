FROM node:13 as node
WORKDIR /Pearl-Jam
COPY ./ /Pearl-Jam/
RUN yarn
RUN yarn build-docker

FROM nginx
COPY --from=node /Pearl-Jam/build /usr/share/nginx/html
RUN rm etc/nginx/conf.d/default.conf
# Overload nginx.conf to enable cors
COPY nginx.conf etc/nginx/conf.d/

