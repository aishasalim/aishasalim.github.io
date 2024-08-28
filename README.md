# This is a personal portfolio website :)

## Deploying to GitHub Pages

### Step 1: Make Changes in `main` Branch

Make your changes and commit them in the `main` branch as usual.

```sh
git add .
git commit -m "Your commit message"
git push origin main
```

### Step 2: Rebuild and Deploy

Use the `deploy.sh` script to rebuild and deploy the changes to the `gh-pages` branch. Here’s the script:

```sh
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
git commit -m "Update deploy.sh script"
git push origin main
```

After making your changes and committing them to the `main` branch, run the `deploy.sh` script to deploy the updates to the `gh-pages` branch.

```sh
./deploy.sh
```

### Automating Deployment with GitHub Actions

To automate the deployment process every time you push to the `main` branch, you can use GitHub Actions.

1. **Create a GitHub Actions Workflow**

   In your repository, create a `.github/workflows/deploy.yml` file with the following content:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches:
         - main

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest

       steps:
         - name: Checkout repository
           uses: actions/checkout@v2

         - name: Set up Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '16'

         - name: Install dependencies
           run: npm install

         - name: Build the project
           run: npm run build

         - name: Deploy to GitHub Pages
           run: |
             cd dist
             git init
             git checkout -b gh-pages
             git add -A
             git commit -m 'Deploy'
             git push -f https://github.com/aishasalim/aishasalim.github.io.git gh-pages
   ```

2. **Commit and Push the Workflow**

   Commit and push the `.github/workflows/deploy.yml` file to the `main` branch.

   ```sh
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Actions workflow for deployment"
   git push origin main
   ```

Now, every time you push changes to the `main` branch, GitHub Actions will automatically build your project and deploy the `dist` folder to the `gh-pages` branch.
