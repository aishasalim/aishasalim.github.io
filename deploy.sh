#!/usr/bin/env sh

# abort on errors
set -e

# Build the project
npm run build

# Navigate into the build output directory
cd dist

# Clean the git repository if it exists
rm -rf .git

# Place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# Initialize a new Git repository
git init
git checkout -B gh-pages

# Add and commit all files
git add -A
git commit -m 'Deploy'

# Add the remote repository (replace with your actual GitHub repository URL)
git remote add origin https://github.com/aishasalim/aishasalim.github.io.git

# Force push to the gh-pages branch
git push -f origin gh-pages

# Navigate back to the project root
cd -

# Push the deploy.sh script to main branch
git add deploy.sh
git commit -m "Add deploy.sh script"
git push origin main
