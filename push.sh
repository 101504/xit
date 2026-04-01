#!/bin/bash

echo "════════════════════════════════════════════════════════════"
echo "  🕶️  RAY-BAN SMART WALL - Git Push  🕶️"
echo "════════════════════════════════════════════════════════════"
echo ""

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "❌ Error: Not a git repository"
    echo "   Run 'git init' first"
    exit 1
fi

# Show current status
echo "📊 Current Git Status:"
echo "────────────────────────────────────────────────────────────"
git status --short
echo ""

# Ask for confirmation
read -p "💾 Add all files and push to repository? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Push cancelled"
    exit 0
fi

# Get commit message
echo ""
read -p "📝 Enter commit message (or press Enter for default): " commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="Update Ray-Ban Smart Wall application"
fi

echo ""
echo "🔄 Processing..."
echo "────────────────────────────────────────────────────────────"

# Add all files
echo "➕ Adding files..."
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "ℹ️  No changes to commit"
    exit 0
fi

# Commit
echo "💾 Committing changes..."
git commit -m "$commit_msg"

if [ $? -ne 0 ]; then
    echo "❌ Commit failed"
    exit 1
fi

# Push to remote
echo "🚀 Pushing to remote repository..."
git push

if [ $? -eq 0 ]; then
    echo ""
    echo "════════════════════════════════════════════════════════════"
    echo "  ✅ Successfully pushed to repository!"
    echo "════════════════════════════════════════════════════════════"
else
    echo ""
    echo "════════════════════════════════════════════════════════════"
    echo "  ❌ Push failed - check your remote configuration"
    echo "════════════════════════════════════════════════════════════"
    echo ""
    echo "💡 Tip: Set remote with:"
    echo "   git remote add origin <your-repo-url>"
    exit 1
fi
