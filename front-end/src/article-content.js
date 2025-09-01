const articles = [
  {
    name: 'learn-node',
    title: 'Introduction to React',
    contents: [
      'React is a JavaScript library for building user interfaces.',
      'It allows developers to create large web applications that can change data without reloading the page.',
      'React uses components, which are reusable UI blocks.',
      'It’s maintained by Meta (Facebook) and a community of developers.'
    ]
  },
  {
    name: 'learn-mb',
    title: 'Understanding JSX',
    contents: [
      'JSX stands for JavaScript XML.',
      'It allows you to write HTML inside JavaScript.',
      'JSX makes code easier to write and understand.',
      'Browsers don’t understand JSX directly, so it gets compiled using tools like Babel.'
    ]
  },
  {
    name: 'props-usage',
    title: 'Using Props in React',
    contents: [
      'Props are used to pass data from parent to child components.',
      'They are read-only and cannot be modified by the child.',
      'Props make components reusable and dynamic.',
      'Use props by writing `<Component propName="value" />`.'
    ]
  },
  {
    name: 'state-hook',
    title: 'Using State in React',
    contents: [
      'State lets you create dynamic and interactive components.',
      'The `useState` hook is used in functional components.',
      'State updates cause the component to re-render.',
      'Always update state using the setter function.'
    ]
  },
  {
    name: 'event-handling',
    title: 'Event Handling in React',
    contents: [
      'React handles events using camelCase syntax like `onClick`, `onChange`.',
      'Event handlers are written as functions.',
      'Events in React are wrapped in a SyntheticEvent object.',
      'You can pass parameters to event handlers using arrow functions.'
    ]
  },
  {
    name: 'conditional-rendering',
    title: 'Conditional Rendering in React',
    contents: [
      'You can render components conditionally using if-else or ternary.',
      'This helps show or hide elements based on certain conditions.',
      'Use logical && operator for short conditionals.',
      'Components can return `null` to render nothing.'
    ]
  },
  {
    name: 'list-rendering',
    title: 'Rendering Lists in React',
    contents: [
      'Use `.map()` to render multiple elements from an array.',
      'Each list item must have a unique `key` prop.',
      'Avoid using index as key unless the list won’t change.',
      'Keys help React track which items changed, added, or removed.'
    ]
  },
  {
    name: 'forms-handling',
    title: 'Handling Forms in React',
    contents: [
      'Forms in React require state to handle input values.',
      'Use controlled components to manage form data.',
      'Use `onChange` to update state as the user types.',
      'Form submission can be handled using `onSubmit`.'
    ]
  },
  {
    name: 'useEffect-hook',
    title: 'Using useEffect Hook',
    contents: [
      '`useEffect` allows you to run side effects in components.',
      'It runs after every render by default.',
      'You can control it using the dependency array.',
      'Common uses: fetching data, updating DOM, setting timers.'
    ]
  },
  {
    name: 'component-types',
    title: 'Types of Components in React',
    contents: [
      'Functional Components: use functions to define components.',
      'Class Components: use ES6 classes and have lifecycle methods.',
      'Today, functional components with hooks are preferred.',
      'Both types can receive props and manage state.'
    ]
  },
  {
    name: 'routing-react',
    title: 'React Routing Basics',
    contents: [
      'React Router helps in adding navigation to your app.',
      'Use `<BrowserRouter>`, `<Routes>`, and `<Route>` components.',
      'Use `<Link>` instead of `<a>` for internal navigation.',
      'Routing avoids full page reload and maintains SPA behavior.'
    ]
  },
  {
    name: 'context-api',
    title: 'React Context API',
    contents: [
      'Context lets you pass data without prop drilling.',
      'Use `createContext`, `Provider`, and `useContext`.',
      'Good for themes, user auth, language switching.',
      'Use it when multiple components need access to the same data.'
    ]
  },
  {
    name: 'custom-hooks',
    title: 'Building Custom Hooks',
    contents: [
      'Custom hooks are functions that start with `use`.',
      'They let you reuse logic across multiple components.',
      'Custom hooks help reduce repetition and improve code clarity.',
      'They can use other hooks like `useState` and `useEffect`.'
    ]
  },
  {
    name: 'lifecycle-methods',
    title: 'Lifecycle Methods in Class Components',
    contents: [
      '`componentDidMount`, `componentDidUpdate`, `componentWillUnmount` are key methods.',
      'They help manage what happens when components load, update, or unmount.',
      'In functional components, useEffect is the alternative.',
      'Lifecycle methods are useful for data fetches or cleanup.'
    ]
  },
  {
    name: 'styling-react',
    title: 'Styling in React',
    contents: [
      'You can use CSS files, CSS modules, or styled-components.',
      'Inline styles are also possible using objects.',
      'Tailwind CSS and Bootstrap are commonly used with React.',
      'CSS Modules help with scoped styles to avoid class conflicts.'
    ]
  },
  {
    name: 'error-boundary',
    title: 'Error Boundaries in React',
    contents: [
      'Error boundaries catch JavaScript errors in the component tree.',
      'They only work in class components using `componentDidCatch`.',
      'You can show fallback UI when an error occurs.',
      'Functional component alternatives use external libraries.'
    ]
  },
  {
    name: 'performance',
    title: 'Performance Optimization in React',
    contents: [
      'Use `React.memo` to memoize components.',
      'Use `useCallback` and `useMemo` to avoid unnecessary recalculations.',
      'Keep state local where needed.',
      'Avoid re-renders by lifting state wisely.'
    ]
  },
  {
    name: 'testing-react',
    title: 'Testing in React',
    contents: [
      'Jest is the most used testing framework for React.',
      'React Testing Library helps test components in user-focused way.',
      'Tests can check for presence of elements, events, and logic.',
      'Keep components small and pure for better testing.'
    ]
  },
  {
    name: 'deployment',
    title: 'Deploying React App',
    contents: [
      'You can deploy using Vercel, Netlify, or GitHub Pages.',
      'First, build the app using `npm run build`.',
      'Upload the `build` folder to the host.',
      'Always test the production build before going live.'
    ]
  },
  {
    name: 'react-vs-angular',
    title: 'React vs Angular',
    contents: [
      'React is a library, Angular is a full framework.',
      'React uses JSX and a component-based model.',
      'Angular uses TypeScript and has more built-in tools.',
      'React is easier to learn, Angular is more structured.'
    ]
  }
];

export default articles;

