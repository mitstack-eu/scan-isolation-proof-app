FROM alpine:3.22
RUN apk upgrade --no-cache && adduser -D -u 10001 app
COPY test.js /app/test.js
USER app
CMD ["cat", "/app/test.js"]
