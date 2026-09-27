FROM alpine:3.22
RUN apk upgrade --no-cache
COPY test.js /app/test.js
CMD ["cat", "/app/test.js"]
