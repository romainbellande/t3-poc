set dotenv-load := true
set dotenv-required := true
set quiet := true

[private]
default :
    just help
[private]
dce +args:
    docker compose exec app bash -c "{{ args }}"

help:
    just --list

check-bin bin custom_message="":
    (which {{ bin }} >/dev/null 2>&1 && echo ""{{ bin }} is installed"") || (echo '{{ if custom_message != "" { custom_message } else { "Error: " + bin +" is not installed" } }}' && exit 1)


requirements:
    just check-bin cypress "Error: cypress is not installed globally, please install it with 'npm i -g cypress@latest'"

[group('init')]
init:
    just requirements
    just cert-init
    just traefik-init

[group('init')]
cert-init:
    just check-bin mkcert
    mkcert -install
    mkcert -cert-file traefik/certs/local-cert.pem -key-file traefik/certs/local-key.pem "${PROJECT_NAME}.localhost" "*.${PROJECT_NAME}.localhost"

[group('init')]
traefik-init:
    docker compose --profile init run envsubst sh -c "envsubst < /wd/traefik/config.example.yml > /wd/traefik/config.yml"

[group('db')]
db-push:
    just dce npm run db:push


