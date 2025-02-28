# Deploying to GitHub Pages

Follow these steps to deploy your pricing slider to GitHub Pages:

## 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "pricing-slider")
4. Choose whether to make it public or private
5. Click "Create repository"

## 2. Push Your Code to GitHub

Run the following commands in your terminal, replacing `YOUR_USERNAME` with your GitHub username and `REPO_NAME` with your repository name:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push your code to GitHub
git push -u origin main
```

## 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" (tab with a gear icon)
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "main" branch
5. Click "Save"

## 4. Access Your Deployed Site

After a few minutes, your site will be available at:
`https://YOUR_USERNAME.github.io/REPO_NAME/`

For example, if your username is "johndoe" and your repository is named "pricing-slider", your site will be available at:
`https://johndoe.github.io/pricing-slider/`

## 5. Sharing Your Pricing Slider

You can now share the URL with anyone who needs to review your pricing slider. They can interact with it directly in their browser without needing to download or install anything.

## Making Updates

If you need to make changes to your pricing slider:

1. Make your changes locally
2. Commit them to your repository:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```
3. Push the changes to GitHub:
   ```bash
   git push
   ```

Your GitHub Pages site will automatically update with the new changes after a few minutes.
