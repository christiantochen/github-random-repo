# GitHub Random Repo Project

This project is built following the instructions from [https://roadmap.sh/projects/github-random-repo](https://roadmap.sh/projects/github-random-repo). It randomly displays a GitHub repository based on the API and allows users to explore repositories directly from their browser.

## 🔧 Built With
- **[Next.js 15](https://nextjs.org/)**: Framework for React applications, enabling server-side rendering and static site generation.
- **[React 19](https://reactjs.org/)**: JavaScript library for building user interfaces.
- **[ShadCN UI](https://ui.shadcn.dev/)**: Component library for building accessible and beautiful interfaces.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for creating custom designs quickly.
- **[GitHub REST API](https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories)**: To fetch and display random repositories from GitHub.

## 📦 Installation

To get started with the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/christiantochen/github-random-repo.git
   ```
2. Copy the .env.example file to .env:
   ```bash
   cp .env.example .env
   ```
3. Obtain your GitHub personal access token by following [GitHub’s guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).   
4. Add your GitHub token to the .env file:
   ```bash
   GITHUB_TOKEN=your_personal_access_token
   ```
5. Install the dependencies:
   ```bash
   npm install
   ```
6. Run the development server:
   ```bash
   npm run dev
   ```
7. Open http://localhost:3000 in your browser to view the project.
