set dotenv-load := true
set dotenv-required := true
set quiet := true

[private]
default :
    just help

help:
    just --list

dcr +args:
    docker compose run  --remove-orphans {{ args }}

[group('init')]
init:
    just cert-init
    just traefik-init

[group('init')]
cert-init:
    which mkcert >/dev/null 2>&1 || (echo "Error: mkcert is not installed" && exit 1)
    mkcert -install
    mkcert -cert-file traefik/certs/local-cert.pem -key-file traefik/certs/local-key.pem "${PROJECT_NAME}.localhost" "*.${PROJECT_NAME}.localhost"

[group('init')]
traefik-init:
    docker compose --profile init run envsubst sh -c "envsubst < /wd/traefik/config.example.yml > /wd/traefik/config.yml"

[group('e2e')]
e2e-base +args:
    just dcr "playwright bash -c '{{ args }}'"

[group('e2e')]
e2e-run:
    npm run e2e:run

[group('e2e')]
e2e-report:
    npm run e2e:report

