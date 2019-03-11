# Dockerfile for the Daughter-API(Standalone)
FROM node:10.14.0-jessie

# update Repositories and installing postgres client
RUN apt-get update
RUN apt-get install mysql-client -y
# RUN apt-get install postgresql-client -y

# Create the working directory
RUN mkdir -p /opt/app
WORKDIR /opt/app

# Install required packages using the package list
ADD ./src/package.json /tmp/package.json
RUN  cd /tmp  && \
  npm install

RUN npm install -g npm@latest
# Inform Docker that the container listens on the specified network ports at runtime
EXPOSE 80

# Force npm to clean the cache for a better pm2 installation
RUN npm cache clean --force
RUN npm install pm2 -g

# Copy the source files to the image, copy the node modules, and make the service runable
COPY ./src /opt/app
RUN rm -rf /opt/app/node_modules && cp -a /tmp/node_modules /opt/app/
RUN chmod 755 /opt/app/run.sh

# npm install in apps(src)
RUN npm install

# Run the API
ENTRYPOINT ["./run.sh"]
