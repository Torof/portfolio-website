import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../LanguageContext';

// Test component that uses the language context
function TestComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <span data-testid="language-value">{language}</span>
      <span data-testid="translated-text">{t('test.key')}</span>
      <button data-testid="set-english" onClick={() => setLanguage('en')}>
        English
      </button>
      <button data-testid="set-french" onClick={() => setLanguage('fr')}>
        Français
      </button>
    </div>
  );
}

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('LanguageContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('should provide default language value', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('language-value')).toHaveTextContent('en');
  });

  it('should switch language when setLanguage is called', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const frenchButton = screen.getByTestId('set-french');
    const languageValue = screen.getByTestId('language-value');

    expect(languageValue).toHaveTextContent('en');

    act(() => {
      fireEvent.click(frenchButton);
    });

    expect(languageValue).toHaveTextContent('fr');
  });

  it('should persist language to localStorage', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const frenchButton = screen.getByTestId('set-french');

    act(() => {
      fireEvent.click(frenchButton);
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('preferred-language', 'fr');
  });

  it('should load language from localStorage on initialization', () => {
    mockLocalStorage.getItem.mockReturnValue('fr');

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('language-value')).toHaveTextContent('fr');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('preferred-language');
  });

  it('should provide translation function', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const translatedText = screen.getByTestId('translated-text');
    expect(translatedText).toBeInTheDocument();
    // The actual translation logic would depend on the implementation
  });

  it('should throw error when useLanguage is used outside LanguageProvider', () => {
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useLanguage must be used within a LanguageProvider');

    console.error = originalError;
  });

  it('should handle invalid language codes gracefully', () => {
    // This test would need to be implemented based on the actual LanguageContext behavior
    // For now, just test that the component doesn't crash with valid inputs
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('language-value')).toBeInTheDocument();
  });
});