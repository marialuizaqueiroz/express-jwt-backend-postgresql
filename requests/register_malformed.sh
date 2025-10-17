#!/usr/bin/env bash
curl -i -X POST http://localhost:4000/api/register \
  -H "Content-Type: application/json" \
  -d '{"foo":"bar"}'
