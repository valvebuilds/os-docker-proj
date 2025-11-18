# mongo-init/rs-init.sh

#!/bin/bash

# Espera un tiempo prudente para asegurar que los servicios de Mongo estén levantados
echo "Esperando que los servicios de Mongo inicien..."
sleep 15 

echo "Iniciando Replica Set 'rs0'..."
mongosh --host db-primary:27017 <<EOF
rs.initiate(
  {
    _id : "rs0",
    members: [
      { _id: 0, host: "db-primary:27017", priority: 10 }, 
      { _id: 1, host: "db-replica:27017", priority: 1 }   
    ]
  }
)
EOF

echo "Replica Set inicializado exitosamente."