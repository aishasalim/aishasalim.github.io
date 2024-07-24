# Build the project
#!/usr/bin/env sh

# abort on errors
set -e

# Build the project
npm run build

# Navigate into the build output directory
cd dist

# Place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# Initialize a new Git repository
git init
git checkout -B main

# Add and commit all files
git add -A
git commit -m 'deploy'

# Add the remote repository (replace with your actual GitHub repository URL if not already set)
git remote add origin https://github.com/aishasalim/aishasalim.github.io.git

# Force push to the gh-pages branch
git push -f origin main:gh-pages

# Navigate back to the project root
cd -

