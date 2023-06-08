FROM denoland/deno:1.33.3

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

WORKDIR /app

# set user
USER deno


COPY . .
RUN deno cache main.ts

EXPOSE 3001

CMD ["run", "-A", "main.ts"]