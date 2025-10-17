#!/usr/bin/env bash
curl -i -X GET http://localhost:4000/api/protected \
  -H "Authorization: Bearer invalid.token.here"
