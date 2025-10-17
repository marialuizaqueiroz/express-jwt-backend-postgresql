#!/usr/bin/env bash
curl -i -X POST http://localhost:4000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria@example.com","password":"wrongpass"}'
