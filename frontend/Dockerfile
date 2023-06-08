FROM denoland/deno:1.33.3

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

ENV HOME=/deno-dir/

WORKDIR /app

# set user
USER deno


COPY . .
RUN deno cache main.ts

EXPOSE 8000

CMD ["run", "-A", "main.ts"]