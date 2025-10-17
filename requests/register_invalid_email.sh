#!/usr/bin/env bash
curl -i -X POST http://localhost:4000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Joao","email":"invalid-email","password":"P@ssw0rd"}'
