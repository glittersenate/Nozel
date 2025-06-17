
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2c37bdcb-154e-4b22-b0d2-99351f25a038

## Important: Dependencies & Compatibility

📋 **Before starting development**, please read [`DEPENDENCIES.md`](./DEPENDENCIES.md) for:
- Key package versions and compatibility notes
- Known issues and fixes (especially Lucide React icons)
- Fresh installation guidelines
- Maintenance best practices

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2c37bdcb-154e-4b22-b0d2-99351f25a038) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- **React** 18.3.1 - Modern React with concurrent features
- **Vite** - Fast build tool and dev server
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **Zustand** - Lightweight state management
- **React Query** - Server state management
- **Lucide React** - Modern icon library

See [`DEPENDENCIES.md`](./DEPENDENCIES.md) for complete version details and compatibility info.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2c37bdcb-154e-4b22-b0d2-99351f25a038) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Troubleshooting

### Common Issues

1. **Icon import errors**: Check [`DEPENDENCIES.md`](./DEPENDENCIES.md) for correct Lucide React icon names
2. **Build failures**: Try deleting `node_modules` and running `npm install` fresh
3. **TypeScript errors**: Ensure all components follow the type definitions

### Fresh Installation

For the cleanest setup without lockfile dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

This ensures you get the latest compatible versions of all dependencies.
