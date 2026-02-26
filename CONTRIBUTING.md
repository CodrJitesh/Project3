# Contributing Guide

Thank you for considering contributing to the Employee Leave Management System!

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)

### Suggesting Features

Feature requests are welcome! Please include:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Mockups or examples (if applicable)

### Code Contributions

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/employee-leave-management.git
   cd employee-leave-management
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make Your Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   - Test all affected features
   - Ensure no existing features break
   - Test on different screen sizes
   - Check console for errors

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   # or
   git commit -m "fix: fix bug description"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Go to original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes
   - Link related issues

## 📝 Coding Standards

### JavaScript/React
- Use functional components with hooks
- Use meaningful variable names
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use PropTypes or TypeScript (future)

### CSS/Tailwind
- Use Tailwind utility classes
- Follow existing color scheme
- Maintain responsive design
- Keep custom CSS minimal

### Backend
- Follow RESTful API conventions
- Use async/await for promises
- Implement proper error handling
- Validate all inputs
- Use middleware for common logic

### Git Commits
Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## 🎨 Design Guidelines

### UI/UX
- Maintain dark-first design
- Use existing color palette
- Keep animations subtle
- Ensure accessibility
- Test on mobile devices

### Components
- Create reusable components
- Use consistent naming
- Document props
- Handle loading states
- Handle error states

## 🧪 Testing

### Manual Testing
- Test happy path
- Test edge cases
- Test error scenarios
- Test different roles
- Test on different browsers

### Future: Automated Testing
- Write unit tests for utilities
- Write integration tests for API
- Write component tests
- Write E2E tests

## 📚 Documentation

When adding features:
- Update README.md if needed
- Update FEATURES.md
- Add JSDoc comments
- Update API documentation
- Add usage examples

## 🔍 Code Review Process

Pull requests will be reviewed for:
- Code quality and style
- Functionality and correctness
- Performance implications
- Security considerations
- Documentation completeness
- Test coverage

## 🚀 Feature Ideas

Looking for something to work on? Here are some ideas:

### High Priority
- [ ] Email notifications system
- [ ] Calendar view for leaves
- [ ] Export reports (PDF/Excel)
- [ ] Leave analytics dashboard
- [ ] Search and filter functionality

### Medium Priority
- [ ] Leave carry-forward logic
- [ ] Holiday calendar integration
- [ ] Team calendar view
- [ ] Leave conflict detection
- [ ] Bulk approval actions

### Low Priority
- [ ] Dark/light theme toggle
- [ ] Multi-language support
- [ ] Custom leave types
- [ ] Department-specific policies
- [ ] Mobile app (React Native)

### Technical Improvements
- [ ] Add TypeScript
- [ ] Add unit tests
- [ ] Add E2E tests
- [ ] Implement caching
- [ ] Add rate limiting
- [ ] Improve error logging
- [ ] Add API documentation (Swagger)
- [ ] Implement CI/CD

## 🐛 Known Issues

Check the Issues tab for known bugs and limitations.

## 💬 Communication

- **Issues**: For bugs and feature requests
- **Pull Requests**: For code contributions
- **Discussions**: For questions and ideas

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Every contribution, no matter how small, is valuable and appreciated!

### Contributors

<!-- Add contributor list here -->

---

**Questions?** Feel free to open an issue for clarification!
