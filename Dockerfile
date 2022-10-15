FROM mcr.microsoft.com/playwright:v1.27.0-focal

ARG PROJECT_DIR=/opt/playwright

RUN mkdir ${PROJECT_DIR}
COPY . ${PROJECT_DIR}
WORKDIR ${PROJECT_DIR}
RUN chown -R pwuser ${PROJECT_DIR} 

USER pwuser

RUN npm install

CMD ["npm", "run-script", "chrome"]