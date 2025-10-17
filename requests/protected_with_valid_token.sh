#!/usr/bin/env bash
TOKEN="$1"
if [ -z "$TOKEN" ]; then
  echo "Usage: $0 <token>"; exit 1
fi
curl -i -X GET http://localhost:4000/api/protected \
  -H "Authorization: Bearer $TOKEN"
