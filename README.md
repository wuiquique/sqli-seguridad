# sqli-seguridad - Luis Menendez

El proyecto esta completamente en Docker.

Para iniciar el proyecto hay que buildear las imagenes.
# docker compose build

Luego levantar los contenedores.
# docker compose up -d

Para revisar los logs de cada contenedor
# docker compose logs -f 'nombredelcontenedor'

Nombres de contenedores:
- front
- backend
- postgres

El backend espera a que la base de datos este healthy para iniciar. En caso no se conecte correctamente.
# docker compose restart backend

Para reiniciar la aplicacion a su estado inicial
# docker compose down -v
Y volver a iniciar