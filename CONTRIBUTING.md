# Contribution Guide

Welcome! Ready to contribute? Follow these simple guidelines to keep things running smoothly.

<br>

## Version Bumping

Whenever you modify any of the following files or folders, **don’t forget to bump the version**:

- [`cli`](cli)
- [`hooks`](hooks)
- [`.npmignore`](.npmignore)
- [`package.json`](package.json)
- [`tsconfig.json`](tsconfig.json)

<br>

### 🚀 Versioning Cheat Sheet

Assume the current version is **`1.0.0`**. Here’s how to increment it based on the type of change:

| Type of Change   | New Version | Description                                    |
| ---------------- | ----------- | ---------------------------------------------- |
| Bug Fixes        | `1.0.1`     | For fixing bugs.                               |
| New Features     | `1.1.0`     | For adding new features.                       |
| Breaking Changes | `2.0.0`     | For changes that break backward compatibility. |

<br>

> [!NOTE]
> No version bump is required for **documentation**, **website updates**, or other **non-code changes**.

<br>

## Examples

### Adding a New Hook:

1. Create a new hook in the `hooks` folder.
2. Add documentation for the hook in the `web/hooks/docs` folder.
   - Follow the existing structure and ensure the table is wrapped inside the `Wrapper` component.
3. Update `README.md` to include the new hook and sort it based on the file structure.
4. Bump the version.
5. Create a pull request (PR).

> [!TIP]
> Since multiple files are being modified (including version-related files), remember to bump the version.

### Updating a Hook:

1. Modify the hook in the `hooks` folder.
2. Update the documentation in `web/hooks/docs` if needed.
3. Bump the version.
4. Create a PR.

### Updating the Website:

1. Modify the website in the `web` folder.
2. Make the necessary changes.
3. Create a PR.

<br>

Happy Coding! 🚀
