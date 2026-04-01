#!/bin/bash

echo "════════════════════════════════════════════════════════════"
echo "  🕶️  RAY-BAN SMART WALL - Starting Application...  🕶️"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "Starting PHP development server on port 8000..."
echo ""

cd "$(dirname "$0")"
php -S localhost:8000

echo ""
echo "Server stopped."
