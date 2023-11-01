#!/bin/sh -x

# As an alternative to run everything in VirtualBox using Vagrant it's possible
# to just run the PostgreSQL database in a Docker container and Play Framework
# in your host operating system.

# This launches a PostgreSQL database with the correct user, password and database
# name as a detached Docker container.
docker run --name hassessolskyddDB -e POSTGRES_USER=hassessolskydd -e POSTGRES_PASSWORD=r4d3+ -e POSTGRES_DB=hassessolskydd -p 5432:5432 -d postgres:latest

# Some nice docker commands:
# Check with 'docker ps'
# Stop with 'docker stop hassessolskyddDB'
# Start with 'docker start hassessolskyddDB'
# Delete with 'docker rm hassessolskyddDB'
