#!/bin/bash

# Helper script to download Facebook profile photo
# Facebook profile photos are typically available at a public URL

echo "Attempting to download Facebook profile photo..."

# Try to download the profile photo using your Facebook username
curl -L "https://graph.facebook.com/vyasapoorv/picture?type=large" -o profile-photo.jpg

if [ -f "profile-photo.jpg" ]; then
    echo "✓ Photo downloaded successfully as profile-photo.jpg"
    echo "✓ Open index.html in your browser to see the result"
else
    echo "✗ Could not download photo automatically"
    echo ""
    echo "Manual steps:"
    echo "1. Go to https://www.facebook.com/vyasapoorv"
    echo "2. Right-click on your profile photo"
    echo "3. Select 'Save Image As...'"
    echo "4. Save it as 'profile-photo.jpg' in this folder"
fi
