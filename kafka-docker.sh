#!/bin/bash

# Nombre del contenedor
CONTAINER_NAME="kafka-server"
IMAGE_NAME="apache/kafka:3.8.0"
TOPIC_NAME_1="appointment-topic"
TOPIC_NAME_2="order-topic"

# Verificar si el contenedor ya existe
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "El contenedor $CONTAINER_NAME ya existe."

    # Verificar si el contenedor está corriendo
    if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
        echo "El contenedor $CONTAINER_NAME ya está en ejecución."
    else
        echo "Iniciando el contenedor $CONTAINER_NAME..."
        docker start $CONTAINER_NAME
    fi
else
    # Crear y correr el contenedor si no existe
    echo "Creando el contenedor $CONTAINER_NAME..."
    docker run -d --name $CONTAINER_NAME -p 9092:9092 -e ALLOW_PLAINTEXT_LISTENER=yes $IMAGE_NAME

    # Esperar a que el contenedor esté listo
    echo "Esperando a que Kafka esté listo..."
    sleep 10  # Tiempo de espera para asegurar que Kafka esté levantado

    # Crear el topic appointment-topic
    echo "Creando el topic $TOPIC_NAME_1..."
    docker exec -it $CONTAINER_NAME /opt/kafka/bin/kafka-topics.sh --create --topic appointment-topic --bootstrap-server localhost:9092

    echo "Topic $TOPIC_NAME_1 creado exitosamente."

    # Crear el topic appointment-topic
    echo "Creando el topic $TOPIC_NAME_2..."
    docker exec -it $CONTAINER_NAME /opt/kafka/bin/kafka-topics.sh --create --topic order-topic --bootstrap-server localhost:9092
    
    echo "Topic $TOPIC_NAME_2 creado exitosamente."
fi
