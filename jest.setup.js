import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, loading, quality, fill, sizes, ...props }) => {
    // Filter out Next.js-specific props that aren't valid on <img> elements
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />
  },
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>
  },
}))

// Mock framer-motion
jest.mock('framer-motion', () => {
  // Helper to filter out framer-motion props
  const filterMotionProps = ({
    animate, initial, exit, variants, transition,
    whileHover, whileTap, whileFocus, whileInView,
    drag, dragConstraints, dragElastic, dragMomentum,
    onDrag, onDragStart, onDragEnd,
    layout, layoutId, style, onAnimationComplete, custom,
    ...props
  }) => props;

  return {
    motion: {
      div: ({ children, ...props }) => <div {...filterMotionProps(props)}>{children}</div>,
      section: ({ children, ...props }) => <section {...filterMotionProps(props)}>{children}</section>,
      span: ({ children, ...props }) => <span {...filterMotionProps(props)}>{children}</span>,
      h1: ({ children, ...props }) => <h1 {...filterMotionProps(props)}>{children}</h1>,
      h2: ({ children, ...props }) => <h2 {...filterMotionProps(props)}>{children}</h2>,
      p: ({ children, ...props }) => <p {...filterMotionProps(props)}>{children}</p>,
      ul: ({ children, ...props }) => <ul {...filterMotionProps(props)}>{children}</ul>,
      li: ({ children, ...props }) => <li {...filterMotionProps(props)}>{children}</li>,
    },
    AnimatePresence: ({ children }) => children,
  };
})

// Mock @react-three/fiber and @react-three/drei for 3D components
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn(),
}))

jest.mock('@react-three/drei', () => ({
  Line: () => <div data-testid="line" />,
  Box: () => <div data-testid="box" />,
  Edges: () => <div data-testid="edges" />,
}))

// Mock three.js
jest.mock('three', () => ({
  Mesh: jest.fn(),
  LineBasicMaterial: jest.fn(),
}))

// Browser-specific mocks (only in jsdom environment)
if (typeof window !== 'undefined') {
  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }
  global.localStorage = localStorageMock

  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
  takeRecords: jest.fn(() => []),
}))

// Mock Canvas API for testing canvas components (only in jsdom environment)
if (typeof HTMLCanvasElement !== 'undefined') {
  const mockCanvas = {
    getContext: jest.fn(() => ({
      fillStyle: '',
      fillRect: jest.fn(),
      fillText: jest.fn(),
      font: '',
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
    })),
    width: 800,
    height: 600,
  }

  global.HTMLCanvasElement.prototype.getContext = mockCanvas.getContext
}