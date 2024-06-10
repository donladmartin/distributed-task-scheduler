# Distributed Task Scheduler - Backend

This is the backend server for the Distributed Task Scheduler application, which is built with Node.js, Express, MongoDB, RabbitMQ, and WebSocket.

## Description

The Distributed Task Scheduler backend provides RESTful APIs for managing tasks, handles task scheduling and execution using Node.js cron jobs and RabbitMQ, and facilitates real-time updates using WebSocket.

## Installation

docker-compose up --build

## Folder Structure

```bash
Distributed-Task-Scheduler/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── index.ts
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── index.js
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```
