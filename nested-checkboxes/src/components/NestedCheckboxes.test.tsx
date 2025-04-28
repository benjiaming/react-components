import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest'; 
import NestedCheckboxes from './NestedCheckboxes';

const mockData = [
  {
    id: 1,
    name: 'Electronics',
    children: [
      {
        id: 2,
        name: 'Mobile Phones',
        children: [
          { id: 3, name: 'iPhone' },
          { id: 4, name: 'Android' },
        ],
      },
      {
        id: 5,
        name: 'Laptops',
        children: [
          { id: 6, name: 'MacBook' },
          { id: 7, name: 'Surface Pro' },
        ],
      },
    ],
  },
  {
    id: 8,
    name: 'Books',
    children: [
      { id: 9, name: 'Fiction' },
      { id: 10, name: 'Non-fiction' },
    ],
  },
];

describe('NestedCheckboxes', () => {
  it('renders all checkboxes correctly', () => {
    render(<NestedCheckboxes defaultCheckboxData={mockData} />);

    // Check that all checkboxes are rendered
    expect(screen.getByLabelText(/Electronics/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile Phones/)).toBeInTheDocument();
    expect(screen.getByLabelText(/iPhone/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Android/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Laptops/)).toBeInTheDocument();
    expect(screen.getByLabelText(/MacBook/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Surface Pro/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Books/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fiction/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Non-fiction/)).toBeInTheDocument();
  });

  it('toggles a checkbox and propagates changes to children', () => {
    render(<NestedCheckboxes defaultCheckboxData={mockData} />);

    // Toggle "Electronics" checkbox
    const electronicsCheckbox = screen.getByLabelText(/Electronics/);
    fireEvent.click(electronicsCheckbox);

    // Check that all children of "Electronics" are also checked
    expect(screen.getByLabelText('Mobile Phones (2)')).toBeChecked();
    expect(screen.getByLabelText('iPhone (3)')).toBeChecked();
    expect(screen.getByLabelText('Android (4)')).toBeChecked();
    expect(screen.getByLabelText('Laptops (5)')).toBeChecked();
    expect(screen.getByLabelText('MacBook (6)')).toBeChecked();
    expect(screen.getByLabelText('Surface Pro (7)')).toBeChecked();
  });

  it('toggles a child checkbox and updates parent state', () => {
    render(<NestedCheckboxes defaultCheckboxData={mockData} />);

    // Toggle "iPhone" checkbox
    const iphoneCheckbox = screen.getByLabelText('iPhone (3)');
    fireEvent.click(iphoneCheckbox);

    // Check that "Mobile Phones" is in an indeterminate state
    const mobilePhonesCheckbox = screen.getByLabelText('Mobile Phones (2)');
    expect((mobilePhonesCheckbox as HTMLInputElement).indeterminate).toBe(true);

    // Check that "Electronics" is also in an indeterminate state
    const electronicsCheckbox = screen.getByLabelText('Electronics (1)');
    expect((electronicsCheckbox as HTMLInputElement).indeterminate).toBe(true);
  });
});