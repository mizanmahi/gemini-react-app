import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HelloWorld from './HelloWorld';

describe('Testing Hello World Component', () => {
   it('Should Render the Hello World', () => {
      render(<HelloWorld />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
   });
});
