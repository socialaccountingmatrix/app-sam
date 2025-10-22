# Contributing Guidelines

Thank you for your interest in contributing to this project! Please follow these guidelines to ensure a smooth collaboration.

## How to Contribute

1. **Fork the repository**  
   Click the "Fork" button at the top-right of this repository.

2. **Create a feature branch**  
   ```bash
   git checkout -b feature/short-description
   ```
- Branch name convention:
```bash
type/short-description
```
- type can be one of:
 - feature → new feature
 - fix → bug fix
 - docs → documentation changes
 - chore → other maintenance tasks

- short-description: lowercase, hyphen-separated, concise description of your work
Example: feature/add-login-form

3. **Make your changes**
Follow the ESLint + Prettier code style.
Ensure your code is clean and readable.

4. **Commit your changes**
```bash
git commit -m "type(scope): short description"
```
- Commit message convention (Conventional Commits):
    - type(scope): short description
        - type: same as branch type (feat, fix, docs, chore)
        - scope (optional): the module or part of the app affected
        - short description: brief summary of changes
Examples:
fix(ui): correct button alignment on dashboard
docs: update contributing guidelines

5. **Push and create a Pull Request**
```bash
git push origin feature/short-description
```
Then create a Pull Request to the main branch of the original repo.

**Code Style**

- Follow the ESLint + Prettier rules enforced in this project.
- Run `npm run lint` to check for linting errors.
- Run `npm run format` to auto-format your code.

**Additional Notes**

- Ensure your PR includes a clear description of the changes.
- Keep commits atomic and meaningful.
- Update documentation if your changes affect usage.